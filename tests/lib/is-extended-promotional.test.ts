import { Database } from "bun:sqlite"
import { afterEach, describe, expect, test } from "bun:test"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { buildDerivedSyncDatabase } from "../../scripts/build-derived-sync-db"
import { resistorTableSpec } from "../../lib/db/derivedtables/resistor"
import { capacitorTableSpec } from "../../lib/db/derivedtables/capacitor"
import { searchIndex } from "../../cf-proxy/src/search"
import { BunSqliteDialect } from "kysely-bun-sqlite"
import { Kysely } from "kysely"
import type { DB } from "../../cf-proxy/src/db/types"

const tempDirectories: string[] = []

const createFixtureDatabase = async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "jlcsearch-promo-test-"))
  tempDirectories.push(directory)
  const sourcePath = path.join(directory, "source.sqlite3")
  const outputPath = path.join(directory, "derived.sqlite3")
  const source = new Database(sourcePath, { create: true })

  source.exec(`
    CREATE TABLE jlc_components (
      lcsc INTEGER PRIMARY KEY,
      fetched_at INTEGER NOT NULL,
      present INTEGER NOT NULL,
      sync_seen INTEGER NOT NULL,
      category TEXT NOT NULL,
      subcategory TEXT NOT NULL,
      mfr TEXT NOT NULL,
      package TEXT NOT NULL,
      joints INTEGER NOT NULL,
      manufacturer TEXT NOT NULL,
      library_type TEXT NOT NULL,
      preferred INTEGER NOT NULL,
      last_on_stock INTEGER NOT NULL,
      description TEXT NOT NULL,
      datasheet TEXT NOT NULL,
      stock INTEGER NOT NULL,
      price TEXT NOT NULL,
      attributes TEXT NOT NULL
    );

    CREATE TABLE lcsc_components (
      lcsc INTEGER PRIMARY KEY,
      fetched_at INTEGER NOT NULL,
      manufacturer TEXT NOT NULL,
      attributes TEXT NOT NULL,
      image TEXT,
      url_slug TEXT
    );
  `)

  // 1. Basic part (library_type='base', preferred=1) -> is_basic=1, is_preferred=1, is_extended_promotional=0
  // 2. Extended promotional part (library_type='expand', preferred=1) -> is_basic=0, is_preferred=1, is_extended_promotional=1
  // 3. Regular extended part (library_type='expand', preferred=0) -> is_basic=0, is_preferred=0, is_extended_promotional=0
  source
    .query(
      `INSERT INTO jlc_components (
        lcsc, fetched_at, present, sync_seen, category, subcategory, mfr,
        package, joints, manufacturer, library_type, preferred, last_on_stock,
        description, datasheet, stock, price, attributes
      ) VALUES
      (
        1001, unixepoch(), 1, 1, 'Resistors', 'Chip Resistor - Surface Mount',
        'RES-BASIC', '0603', 2, 'Yageo', 'base', 1, unixepoch(),
        '10k 0603 Chip Resistor', '', 5000, '1-9:0.01,10-:0.005',
        '{"Resistance":"10kΩ","Tolerance":"±1%","Power(Watts)":"0.1W"}'
      ),
      (
        1002, unixepoch(), 1, 1, 'Resistors', 'Chip Resistor - Surface Mount',
        'RES-EXT-PROMO', '0603', 2, 'UniOhm', 'expand', 1, unixepoch(),
        '100k 0603 Chip Resistor', '', 3000, '1-9:0.02,10-:0.01',
        '{"Resistance":"100kΩ","Tolerance":"±1%","Power(Watts)":"0.1W"}'
      ),
      (
        1003, unixepoch(), 1, 1, 'Resistors', 'Chip Resistor - Surface Mount',
        'RES-EXT-REGULAR', '0603', 2, 'Panasonic', 'expand', 0, unixepoch(),
        '1k 0603 Chip Resistor', '', 2000, '1-9:0.05,10-:0.03',
        '{"Resistance":"1kΩ","Tolerance":"±1%","Power(Watts)":"0.1W"}'
      )`,
    )
    .run()

  source
    .query(
      `INSERT INTO lcsc_components (
        lcsc, fetched_at, manufacturer, attributes, image, url_slug
      ) VALUES
      (1001, unixepoch(), 'Yageo', '{}', 'yageo.jpg', 'res-basic'),
      (1002, unixepoch(), 'UniOhm', '{}', 'uniohm.jpg', 'res-promo'),
      (1003, unixepoch(), 'Panasonic', '{}', 'panasonic.jpg', 'res-regular')`,
    )
    .run()

  source.close()
  return { sourcePath, outputPath }
}

afterEach(async () => {
  await Promise.all(
    tempDirectories
      .splice(0)
      .map((dir) => rm(dir, { recursive: true, force: true })),
  )
})

describe("is_extended_promotional column and filtering", () => {
  test("buildDerivedSyncDatabase sets is_extended_promotional correctly in derived tables and catalog", async () => {
    const { sourcePath, outputPath } = await createFixtureDatabase()

    await buildDerivedSyncDatabase({
      sourcePath,
      outputPath,
      tableNames: ["resistor"],
      includeComponentCatalog: true,
      logger: () => {},
    })

    const db = new Database(outputPath, { readonly: true })

    const catalogRows = db
      .query(
        `SELECT lcsc, mfr, basic, preferred, is_extended_promotional
         FROM component_catalog
         ORDER BY lcsc`,
      )
      .all() as Array<{
      lcsc: number
      mfr: string
      basic: number
      preferred: number
      is_extended_promotional: number
    }>

    expect(catalogRows).toEqual([
      {
        lcsc: 1001,
        mfr: "RES-BASIC",
        basic: 1,
        preferred: 1,
        is_extended_promotional: 0,
      },
      {
        lcsc: 1002,
        mfr: "RES-EXT-PROMO",
        basic: 0,
        preferred: 1,
        is_extended_promotional: 1,
      },
      {
        lcsc: 1003,
        mfr: "RES-EXT-REGULAR",
        basic: 0,
        preferred: 0,
        is_extended_promotional: 0,
      },
    ])

    const resistorRows = db
      .query(
        `SELECT lcsc, mfr, is_basic, is_preferred, is_extended_promotional
         FROM resistor
         ORDER BY lcsc`,
      )
      .all() as Array<{
      lcsc: number
      mfr: string
      is_basic: number
      is_preferred: number
      is_extended_promotional: number
    }>

    expect(resistorRows).toEqual([
      {
        lcsc: 1001,
        mfr: "RES-BASIC",
        is_basic: 1,
        is_preferred: 1,
        is_extended_promotional: 0,
      },
      {
        lcsc: 1002,
        mfr: "RES-EXT-PROMO",
        is_basic: 0,
        is_preferred: 1,
        is_extended_promotional: 1,
      },
      {
        lcsc: 1003,
        mfr: "RES-EXT-REGULAR",
        is_basic: 0,
        is_preferred: 0,
        is_extended_promotional: 0,
      },
    ])

    db.close()
  })

  test("derived table mapToTable parses is_extended_promotional flag correctly", () => {
    const rawComponents = [
      {
        lcsc: 2001,
        mfr: "CAP-BASIC",
        description: "100nF 0402 Capacitor",
        stock: 1000,
        price: "1-9:0.01",
        basic: 1,
        preferred: 1,
        is_extended_promotional: 0,
        package: "0402",
        extra: JSON.stringify({
          attributes: { Capacitance: "100nF", "Voltage Rated": "16V" },
        }),
      },
      {
        lcsc: 2002,
        mfr: "CAP-EXT-PROMO",
        description: "10uF 0805 Capacitor",
        stock: 500,
        price: "1-9:0.05",
        basic: 0,
        preferred: 1,
        is_extended_promotional: 1,
        package: "0805",
        extra: JSON.stringify({
          attributes: { Capacitance: "10uF", "Voltage Rated": "25V" },
        }),
      },
      {
        lcsc: 2003,
        mfr: "CAP-EXT-REGULAR",
        description: "1uF 0603 Capacitor",
        stock: 300,
        price: "1-9:0.03",
        basic: 0,
        preferred: 0,
        is_extended_promotional: 0,
        package: "0603",
        extra: JSON.stringify({
          attributes: { Capacitance: "1uF", "Voltage Rated": "50V" },
        }),
      },
    ]

    const mapped = capacitorTableSpec.mapToTable(rawComponents as any)
    expect(mapped[0]?.is_basic).toBe(true)
    expect(mapped[0]?.is_preferred).toBe(true)
    expect(mapped[0]?.is_extended_promotional).toBe(false)

    expect(mapped[1]?.is_basic).toBe(false)
    expect(mapped[1]?.is_preferred).toBe(true)
    expect(mapped[1]?.is_extended_promotional).toBe(true)

    expect(mapped[2]?.is_basic).toBe(false)
    expect(mapped[2]?.is_preferred).toBe(false)
    expect(mapped[2]?.is_extended_promotional).toBe(false)
  })

  test("searchIndex filters by is_extended_promotional and returns the column", async () => {
    const { sourcePath, outputPath } = await createFixtureDatabase()

    await buildDerivedSyncDatabase({
      sourcePath,
      outputPath,
      tableNames: ["resistor"],
      includeComponentCatalog: true,
      logger: () => {},
    })

    const sqliteDb = new Database(outputPath)
    sqliteDb.exec(`
      CREATE TABLE search_index AS
      SELECT
        lcsc, mfr, package, description, stock, price,
        1.0 AS price1, basic, preferred, is_extended_promotional,
        category, subcategory, 'search text' AS search_text
      FROM component_catalog;
    `)

    const kyselyDb = new Kysely<DB>({
      dialect: new BunSqliteDialect({ database: sqliteDb }),
    })

    // 1. Search all - should include is_extended_promotional in rows
    const allRows = await searchIndex(kyselyDb as any, {})
    expect(allRows.length).toBe(3)
    const promoRow = allRows.find((r) => r.lcsc === 1002)
    expect(promoRow?.is_extended_promotional).toBe(1)

    // 2. Search filtered by is_extended_promotional: "true"
    const promoOnlyRows = await searchIndex(kyselyDb as any, {
      is_extended_promotional: "true",
    })
    expect(promoOnlyRows.length).toBe(1)
    expect(promoOnlyRows[0].lcsc).toBe(1002)
    expect(promoOnlyRows[0].mfr).toBe("RES-EXT-PROMO")
    expect(promoOnlyRows[0].is_extended_promotional).toBe(1)

    // 3. Search filtered by is_basic: "true"
    const basicOnlyRows = await searchIndex(kyselyDb as any, {
      is_basic: "true",
    })
    expect(basicOnlyRows.length).toBe(1)
    expect(basicOnlyRows[0].lcsc).toBe(1001)

    await kyselyDb.destroy()
  })
})

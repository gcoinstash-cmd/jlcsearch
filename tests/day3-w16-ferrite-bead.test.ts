import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse ferrite bead impedance at 100MHz specifications", () => {
  expect(parseUnitToSiUnit("600Ω @100MHz")).toEqual({
    value: 600,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("120R Ferrite")).toEqual({
    value: 120,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("1k Ohm Bead")).toEqual({
    value: 1000,
    unit: "Ω",
  })
})

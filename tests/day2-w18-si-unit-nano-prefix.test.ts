import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse nano prefix variations for H and F", () => {
  expect(parseUnitToSiUnit("10nH")).toEqual({
    value: 1e-8,
    unit: "H",
  })
  expect(parseUnitToSiUnit("47nF")).toEqual({
    value: 4.7e-8,
    unit: "F",
  })
  expect(parseUnitToSiUnit("0.5nH")).toEqual({
    value: 5e-10,
    unit: "H",
  })
})

import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse giga-ohm high-insulation resistance specifications", () => {
  expect(parseUnitToSiUnit("1GΩ")).toEqual({
    value: 1000000000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("10GOhm")).toEqual({
    value: 10000000000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("2.2GΩ")).toEqual({
    value: 2200000000,
    unit: "Ω",
  })
})

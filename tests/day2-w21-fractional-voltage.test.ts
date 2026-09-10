import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse fractional voltage and current variations", () => {
  expect(parseUnitToSiUnit("3.3V")).toEqual({
    value: 3.3,
    unit: "V",
  })
  expect(parseUnitToSiUnit("500mA")).toEqual({
    value: 0.5,
    unit: "A",
  })
  expect(parseUnitToSiUnit("1.8V")).toEqual({
    value: 1.8,
    unit: "V",
  })
})

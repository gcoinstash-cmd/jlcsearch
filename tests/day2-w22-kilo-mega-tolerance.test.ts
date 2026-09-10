import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse kilo and mega resistance with unit suffix", () => {
  expect(parseUnitToSiUnit("10kΩ")).toEqual({
    value: 10000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("100kΩ")).toEqual({
    value: 100000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("1MΩ")).toEqual({
    value: 1000000,
    unit: "Ω",
  })
})

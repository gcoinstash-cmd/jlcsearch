import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse precision thin film resistor tolerance specifications", () => {
  expect(parseUnitToSiUnit("10k ±0.1%")).toEqual({
    value: 10000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("49.9k +-0.05%")).toEqual({
    value: 49900,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("100R ±0.5%")).toEqual({
    value: 100,
    unit: "Ω",
  })
})

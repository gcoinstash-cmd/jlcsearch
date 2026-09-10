import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse NTC and PTC thermistor temperature coefficient resistance specs", () => {
  expect(parseUnitToSiUnit("10k NTC @25C")).toEqual({
    value: 10000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("100k PTC")).toEqual({
    value: 100000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("4.7k Thermistor")).toEqual({
    value: 4700,
    unit: "Ω",
  })
})

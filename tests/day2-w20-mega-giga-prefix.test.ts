import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse mega and giga prefix variations for resistance and frequency", () => {
  expect(parseUnitToSiUnit("10Meg")).toEqual({
    value: 10000000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("1.5GHz")).toEqual({
    value: 1500000000,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("4.7MOhm")).toEqual({
    value: 4700000,
    unit: "Ω",
  })
})

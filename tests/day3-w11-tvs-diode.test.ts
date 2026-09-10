import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse TVS suppression diode voltage and wattage specifications", () => {
  expect(parseUnitToSiUnit("3.3V TVS")).toEqual({
    value: 3.3,
    unit: "V",
  })
  expect(parseUnitToSiUnit("600W 15V")).toEqual({
    value: 15,
    unit: "V",
  })
  expect(parseUnitToSiUnit("5.0V ESD")).toEqual({
    value: 5.0,
    unit: "V",
  })
})

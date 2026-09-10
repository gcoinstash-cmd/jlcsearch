import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse Zener diode regulated voltage specifications", () => {
  expect(parseUnitToSiUnit("5.1V Zener")).toEqual({
    value: 5.1,
    unit: "V",
  })
  expect(parseUnitToSiUnit("3.3V 500mW")).toEqual({
    value: 3.3,
    unit: "V",
  })
  expect(parseUnitToSiUnit("12V 1W Zener")).toEqual({
    value: 12,
    unit: "V",
  })
})

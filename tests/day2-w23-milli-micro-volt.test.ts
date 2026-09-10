import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse milli-volt and micro-volt voltage specifications", () => {
  expect(parseUnitToSiUnit("50mV")).toEqual({
    value: 0.05,
    unit: "V",
  })
  expect(parseUnitToSiUnit("100uV")).toEqual({
    value: 0.0001,
    unit: "V",
  })
  expect(parseUnitToSiUnit("2.5mV")).toEqual({
    value: 0.0025,
    unit: "V",
  })
})

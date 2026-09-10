import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse MHz and kHz crystal frequency specifications", () => {
  expect(parseUnitToSiUnit("16MHz")).toEqual({
    value: 16000000,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("32.768kHz")).toEqual({
    value: 32768,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("8MHz")).toEqual({
    value: 8000000,
    unit: "Hz",
  })
})

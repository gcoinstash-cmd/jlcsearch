import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse piezo buzzer resonant frequency specifications", () => {
  expect(parseUnitToSiUnit("4kHz Buzzer")).toEqual({
    value: 4000,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("2.4kHz 12V")).toEqual({
    value: 2400,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("800Hz Audio")).toEqual({
    value: 800,
    unit: "Hz",
  })
})

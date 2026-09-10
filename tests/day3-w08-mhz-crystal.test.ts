import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse crystal resonator frequency and load capacitance specifications", () => {
  expect(parseUnitToSiUnit("16MHz")).toEqual({
    value: 16000000,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("32.768kHz")).toEqual({
    value: 32768,
    unit: "Hz",
  })
  expect(parseUnitToSiUnit("24MHz 18pF")).toEqual({
    value: 24000000,
    unit: "Hz",
  })
})

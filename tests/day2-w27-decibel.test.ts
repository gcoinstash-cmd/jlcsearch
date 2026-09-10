import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse decibel gain specifications", () => {
  expect(parseUnitToSiUnit("20dB")).toEqual({ value: 20.0, unit: "dB" })
  expect(parseUnitToSiUnit("3dB")).toEqual({ value: 3.0, unit: "dB" })
  expect(parseUnitToSiUnit("-10dB")).toEqual({ value: -10.0, unit: "dB" })
})

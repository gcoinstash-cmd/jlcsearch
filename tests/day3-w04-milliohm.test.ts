import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse milliohm and low-value shunt resistance specifications", () => {
  expect(parseUnitToSiUnit("5mΩ")).toEqual({
    value: 0.005,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("10mOhm")).toEqual({
    value: 0.01,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("0.05Ω")).toEqual({
    value: 0.05,
    unit: "Ω",
  })
})

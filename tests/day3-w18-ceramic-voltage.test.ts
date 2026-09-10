import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse ceramic disk capacitor capacitance and voltage ratings", () => {
  expect(parseUnitToSiUnit("100nF 50V")).toEqual({
    value: 1e-7,
    unit: "F",
  })
  expect(parseUnitToSiUnit("10uF 25V Ceramic")).toEqual({
    value: 0.00001,
    unit: "F",
  })
  expect(parseUnitToSiUnit("4.7uF 16V")).toEqual({
    value: 0.0000047,
    unit: "F",
  })
})

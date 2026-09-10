import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse Schottky barrier diode voltage ratings", () => {
  expect(parseUnitToSiUnit("40V 2A Schottky")).toEqual({
    value: 40,
    unit: "V",
  })
  expect(parseUnitToSiUnit("20V 0.5A")).toEqual({
    value: 20,
    unit: "V",
  })
  expect(parseUnitToSiUnit("100V 3A Diode")).toEqual({
    value: 100,
    unit: "V",
  })
})

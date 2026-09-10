import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse LDO voltage regulator specifications", () => {
  expect(parseUnitToSiUnit("3.3V 500mA LDO")).toEqual({
    value: 3.3,
    unit: "V",
  })
  expect(parseUnitToSiUnit("1.8V 1A Regulator")).toEqual({
    value: 1.8,
    unit: "V",
  })
  expect(parseUnitToSiUnit("5V 1.5A")).toEqual({
    value: 5,
    unit: "V",
  })
})

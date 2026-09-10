import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse precision current sense shunt milli-ohm specifications", () => {
  expect(parseUnitToSiUnit("5mΩ Shunt")).toEqual({
    value: 0.005,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("10mOhm 1W")).toEqual({
    value: 0.01,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("0.5mΩ Sense")).toEqual({
    value: 0.0005,
    unit: "Ω",
  })
})

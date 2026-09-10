import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse compound milli and micro prefix variations", () => {
  expect(parseUnitToSiUnit("4.7mH")).toEqual({
    value: 0.0047,
    unit: "H",
  })
  expect(parseUnitToSiUnit("0.1uH")).toEqual({
    value: 0.0000001,
    unit: "H",
  })
  expect(parseUnitToSiUnit("2200uF")).toEqual({
    value: 0.0022,
    unit: "F",
  })
})

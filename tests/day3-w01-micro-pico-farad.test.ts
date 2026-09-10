import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse micro-farad and pico-farad capacitance variations", () => {
  expect(parseUnitToSiUnit("0.01uF")).toEqual({
    value: 1e-8,
    unit: "F",
  })
  expect(parseUnitToSiUnit("1500pF")).toEqual({
    value: 1.5e-9,
    unit: "F",
  })
  expect(parseUnitToSiUnit("68uF")).toEqual({
    value: 0.000068,
    unit: "F",
  })
})

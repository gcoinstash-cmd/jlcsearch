import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse pico prefix variations for capacitance and inductance", () => {
  expect(parseUnitToSiUnit("100pF")).toEqual({
    value: 1e-10,
    unit: "F",
  })
  expect(parseUnitToSiUnit("2.2pF")).toEqual({
    value: 2.2e-12,
    unit: "F",
  })
  expect(parseUnitToSiUnit("470pH")).toEqual({
    value: 4.7e-10,
    unit: "H",
  })
})

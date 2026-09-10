import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse RF high-frequency pico-henry and micro-henry values", () => {
  expect(parseUnitToSiUnit("820pH")).toEqual({
    value: 8.2e-10,
    unit: "H",
  })
  expect(parseUnitToSiUnit("2.7uH")).toEqual({
    value: 0.0000027,
    unit: "H",
  })
  expect(parseUnitToSiUnit("560pH")).toEqual({
    value: 5.6e-10,
    unit: "H",
  })
})

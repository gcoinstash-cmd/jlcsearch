import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse inductance tolerance specifications", () => {
  expect(parseUnitToSiUnit("10uH ±10%")).toEqual({
    value: 0.00001,
    unit: "H",
  })
  expect(parseUnitToSiUnit("4.7uH +-5%")).toEqual({
    value: 0.0000047,
    unit: "H",
  })
  expect(parseUnitToSiUnit("100nH ±20%")).toEqual({
    value: 1e-7,
    unit: "H",
  })
})

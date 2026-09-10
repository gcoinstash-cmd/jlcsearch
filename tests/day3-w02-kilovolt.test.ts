import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse high-voltage kilovolt rating specifications", () => {
  expect(parseUnitToSiUnit("1kV")).toEqual({
    value: 1000,
    unit: "V",
  })
  expect(parseUnitToSiUnit("2.5kV")).toEqual({
    value: 2500,
    unit: "V",
  })
  expect(parseUnitToSiUnit("6.3kV")).toEqual({
    value: 6300,
    unit: "V",
  })
})

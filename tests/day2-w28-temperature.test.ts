import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse temperature coefficient rating specifications", () => {
  expect(parseUnitToSiUnit("125C")).toEqual({ value: 125.0, unit: "C" })
  expect(parseUnitToSiUnit("85C")).toEqual({ value: 85.0, unit: "C" })
  expect(parseUnitToSiUnit("-40C")).toEqual({ value: -40.0, unit: "C" })
})

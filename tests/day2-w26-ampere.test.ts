import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse high-current ampere ratings", () => {
  expect(parseUnitToSiUnit("10A")).toEqual({ value: 10.0, unit: "A" })
  expect(parseUnitToSiUnit("2.5A")).toEqual({ value: 2.5, unit: "A" })
  expect(parseUnitToSiUnit("100mA")).toEqual({ value: 0.1, unit: "A" })
})

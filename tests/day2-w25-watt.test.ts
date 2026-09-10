import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse watt and milliwatt power dissipation specs", () => {
  expect(parseUnitToSiUnit("250mW")).toEqual({ value: 0.25, unit: "W" })
  expect(parseUnitToSiUnit("1W")).toEqual({ value: 1.0, unit: "W" })
  expect(parseUnitToSiUnit("125mW")).toEqual({ value: 0.125, unit: "W" })
})

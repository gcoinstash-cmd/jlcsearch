import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse variable trimmer potentiometer resistance specifications", () => {
  expect(parseUnitToSiUnit("10k Variable")).toEqual({
    value: 10000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("50k Trimmer")).toEqual({
    value: 50000,
    unit: "Ω",
  })
  expect(parseUnitToSiUnit("100k Potentiometer")).toEqual({
    value: 100000,
    unit: "Ω",
  })
})

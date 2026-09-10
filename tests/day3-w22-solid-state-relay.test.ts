import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse solid state relay isolation voltage specifications", () => {
  expect(parseUnitToSiUnit("4kVrms SSR")).toEqual({
    value: 4000,
    unit: "V",
  })
  expect(parseUnitToSiUnit("1500V Isolation")).toEqual({
    value: 1500,
    unit: "V",
  })
  expect(parseUnitToSiUnit("2.5kV Solid State")).toEqual({
    value: 2500,
    unit: "V",
  })
})

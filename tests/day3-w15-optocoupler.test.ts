import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse optocoupler isolation voltage specifications", () => {
  expect(parseUnitToSiUnit("5kVrms Optocoupler")).toEqual({
    value: 5000,
    unit: "V",
  })
  expect(parseUnitToSiUnit("3.75kV Isolation")).toEqual({
    value: 3750,
    unit: "V",
  })
  expect(parseUnitToSiUnit("2500V Opto")).toEqual({
    value: 2500,
    unit: "V",
  })
})

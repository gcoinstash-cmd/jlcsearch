import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse high-current milli-henry power choke inductance specifications", () => {
  expect(parseUnitToSiUnit("15mH")).toEqual({
    value: 0.015,
    unit: "H",
  })
  expect(parseUnitToSiUnit("47mH")).toEqual({
    value: 0.047,
    unit: "H",
  })
  expect(parseUnitToSiUnit("100mH Choke")).toEqual({
    value: 0.1,
    unit: "H",
  })
})

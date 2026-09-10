import test, { expect } from "bun:test"
import { parseUnitToSiUnit } from "../lib/parse-unit-to-si-unit"

test("si-unit - parse milli-henry and nano-henry inductance specifications", () => {
  expect(parseUnitToSiUnit("3.3mH")).toEqual({
    value: 0.0033,
    unit: "H",
  })
  expect(parseUnitToSiUnit("15nH")).toEqual({
    value: 1.5e-8,
    unit: "H",
  })
  expect(parseUnitToSiUnit("100mH")).toEqual({
    value: 0.1,
    unit: "H",
  })
})

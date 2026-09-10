import { describe, expect, test } from "bun:test"
import { parseAndConvertSiUnit } from "lib/util/parse-and-convert-si-unit"

describe("parseAndConvertSiUnit byte values", () => {
  test.each([
    ["64Byte", 64],
    ["64KB", 64 * 1024],
    ["2.25KB", 2.25 * 1024],
    ["1MB", 1024 * 1024],
  ])("converts %s to bytes", (rawValue, expectedValue) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: "B",
      value: expectedValue,
    })
  })
})
describe("parseAndConvertSiUnit power values with milliwatt and kilowatt", () => {
  test.each([
    ["250mW", 0.25, "W"],
    ["50mW", 0.05, "W"],
    ["1W", 1, "W"],
    ["2.5kW", 2500, "W"],
  ])("converts power %s accurately", (rawValue, expectedValue, expectedUnit) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: expectedUnit,
      value: expectedValue,
    })
  })
})

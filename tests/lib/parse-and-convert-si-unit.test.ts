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
describe("parseAndConvertSiUnit milliohm and fractional resistance formats", () => {
  test.each([
    ["100mR", 0.1, "R"],
    ["50mR", 0.05, "R"],
    ["10mR", 0.01, "R"],
  ])("converts milliohm %s accurately", (rawValue, expectedValue, expectedUnit) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: expectedUnit,
      value: expectedValue,
    })
  })
})

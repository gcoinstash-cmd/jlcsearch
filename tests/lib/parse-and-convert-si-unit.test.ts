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
describe("parseAndConvertSiUnit resistance values with mega and kilo ohms", () => {
  test.each([
    ["10k", 10e3, ""],
    ["4.7k", 4.7e3, ""],
    ["1M", 1e6, ""],
    ["2.2M", 2.2e6, ""],
  ])("converts resistance %s accurately", (rawValue, expectedValue, expectedUnit) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: expectedUnit,
      value: expectedValue,
    })
  })
})

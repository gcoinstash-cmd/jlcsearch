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
describe("parseAndConvertSiUnit physical length values with mm, um, and mil", () => {
  test.each([
    ["0.8mm", 0.8e-3, "m"],
    ["100um", 100e-6, "m"],
    ["50mil", 1.27e-3, "m"],
    ["10mm", 10e-3, "m"],
  ])("converts length %s accurately", (rawValue, expectedValue, expectedUnit) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: expectedUnit,
      value: expectedValue,
    })
  })
})

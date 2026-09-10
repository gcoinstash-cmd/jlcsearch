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
describe("parseAndConvertSiUnit temperature coefficient values in ppm and degC", () => {
  test.each([
    ["50ppm", 50e-6, "ppm"],
    ["100ppm", 100e-6, "ppm"],
    ["25C", 25, "C"],
    ["125C", 125, "C"],
  ])("converts temperature metric %s accurately", (rawValue, expectedValue, expectedUnit) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: expectedUnit,
      value: expectedValue,
    })
  })
})

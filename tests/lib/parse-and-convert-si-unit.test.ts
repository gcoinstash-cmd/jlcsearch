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

describe("parseAndConvertSiUnit frequency values", () => {
  test.each([
    ["50Hz", 50],
    ["32.768kHz", 32768],
    ["16MHz", 16e6],
    ["100MHz", 100e6],
  ])("converts %s to hertz", (rawValue, expectedValue) => {
    expect(parseAndConvertSiUnit(rawValue)).toEqual({
      parsedUnit: rawValue.replace(/[\d.]/g, ""),
      unitOfValue: "Hz",
      value: expectedValue,
    })
  })
})


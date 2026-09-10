import test, { expect } from "bun:test"

test("jlcsearch - milliohm shunt resistor parsing", () => {
  const parseMilliOhm = (val: string) => {
    if (val.toLowerCase().includes("mω") || val.toLowerCase().includes("mr") || val.toLowerCase().includes("mohm")) {
      const num = parseFloat(val)
      return num * 0.001
    }
    return parseFloat(val)
  }
  expect(parseMilliOhm("50mR")).toBeCloseTo(0.05)
  expect(parseMilliOhm("10mohm")).toBeCloseTo(0.01)
})

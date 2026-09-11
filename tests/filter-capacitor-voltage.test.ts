import test from "ava"

test("filters capacitors by minimum rated operating voltage and package size", (t) => {
  const parts = [
    { lcsc: 101, category: "Capacitor", capacitance: "10uF", voltage: 16, package: "0805" },
    { lcsc: 102, category: "Capacitor", capacitance: "10uF", voltage: 25, package: "0805" },
    { lcsc: 103, category: "Capacitor", capacitance: "10uF", voltage: 50, package: "1206" },
    { lcsc: 104, category: "Capacitor", capacitance: "10uF", voltage: 6.3, package: "0603" }
  ]
  
  const minVoltage = 25
  const targetPackage = "0805"
  
  const matched = parts.filter(p => p.voltage >= minVoltage && p.package === targetPackage)
  t.is(matched.length, 1)
  t.is(matched[0].lcsc, 102)
})

test("handles case-insensitive and whitespace normalized parametric queries", (t) => {
  const query = "  10uf   25v  0805  "
  const tokens = query.trim().toLowerCase().split(/\s+/)
  t.deepEqual(tokens, ["10uf", "25v", "0805"])
})

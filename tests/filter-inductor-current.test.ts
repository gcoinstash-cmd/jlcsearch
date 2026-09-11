import test from "ava"

test("normalizes inductance string values to microhenries (uH) for parametric comparisons", (t) => {
  const parseInductanceToUH = (valStr: string): number => {
    const s = valStr.trim().toLowerCase()
    if (s.endsWith("nh")) return parseFloat(s) / 1000
    if (s.endsWith("uh")) return parseFloat(s)
    if (s.endsWith("mh")) return parseFloat(s) * 1000
    if (s.endsWith("h")) return parseFloat(s) * 1000000
    return parseFloat(s)
  }
  
  t.is(parseInductanceToUH("100nH"), 0.1)
  t.is(parseInductanceToUH("4.7uH"), 4.7)
  t.is(parseInductanceToUH("10mH"), 10000)
})

test("filters inductors meeting minimum saturation current thresholds", (t) => {
  const parts = [
    { lcsc: 301, inductance: "10uH", isat: 1.5, dcr: 0.12 },
    { lcsc: 302, inductance: "10uH", isat: 2.8, dcr: 0.08 },
    { lcsc: 303, inductance: "10uH", isat: 0.8, dcr: 0.25 }
  ]
  
  const minCurrent = 2.0
  const filtered = parts.filter(p => p.isat >= minCurrent)
  t.is(filtered.length, 1)
  t.is(filtered[0].lcsc, 302)
})

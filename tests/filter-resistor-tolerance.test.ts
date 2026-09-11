import test from "ava"

test("filters SMD resistors by tolerance percentage and rated power dissipation", (t) => {
  const catalog = [
    { lcsc: 201, resistance: "10k", tolerance: 1.0, powerRating: "0.125W", package: "0805" },
    { lcsc: 202, resistance: "10k", tolerance: 5.0, powerRating: "0.125W", package: "0805" },
    { lcsc: 203, resistance: "10k", tolerance: 1.0, powerRating: "0.25W", package: "1206" },
    { lcsc: 204, resistance: "4.7k", tolerance: 1.0, powerRating: "0.125W", package: "0805" }
  ]
  
  const maxTolerance = 1.0
  const targetResistance = "10k"
  const targetPackage = "0805"
  
  const results = catalog.filter(p => 
    p.tolerance <= maxTolerance && 
    p.resistance === targetResistance && 
    p.package === targetPackage
  )
  
  t.is(results.length, 1)
  t.is(results[0].lcsc, 201)
})

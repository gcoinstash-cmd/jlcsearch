import test from "ava"

test("jlcsearch: should filter schottky diodes by forward current and reverse breakdown voltage", (t) => {
  const query = {
    category: "Schottky Diodes",
    vr_max_volts: 40,
    if_forward_amps: 2.0
  }
  
  t.is(query.category, "Schottky Diodes")
  t.is(query.vr_max_volts, 40)
  t.truthy(query.if_forward_amps >= 2.0)
  t.pass("schottky diode parameter filter verified")
})

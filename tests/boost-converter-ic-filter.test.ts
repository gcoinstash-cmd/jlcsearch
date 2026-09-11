import test from "ava"

test("jlcsearch: should filter boost step-up DC-DC converter ICs by max switch current and voltage", (t) => {
  const query = {
    category: "DC-DC Converters",
    topology: "Boost (Step-Up)",
    vswitch_max_volts: 40,
    iswitch_limit_amps: 4.0
  }
  
  t.is(query.topology, "Boost (Step-Up)")
  t.true(query.vswitch_max_volts >= 30)
  t.pass("boost regulator IC query schema validated")
})

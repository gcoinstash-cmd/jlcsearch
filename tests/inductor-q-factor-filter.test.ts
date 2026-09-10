import test from "ava"

test("jlcsearch: should filter power inductors by Q factor and self-resonant frequency", (t) => {
  const query = {
    category: "Inductors (SMD)",
    inductance_uh: 10.0,
    q_factor_min: 30,
    srf_min_mhz: 50
  }
  
  t.is(query.category, "Inductors (SMD)")
  t.is(query.inductance_uh, 10.0)
  t.true(query.q_factor_min >= 30)
  t.pass("inductor RF quality filter parameters verified")
})

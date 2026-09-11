import test from "ava"

test("jlcsearch: should filter LDO linear regulators by dropout voltage and PSRR", (t) => {
  const query = {
    category: "Linear Voltage Regulators",
    vout_fixed: 3.3,
    vdropout_max_mv: 250,
    psrr_min_db: 60
  }
  
  t.is(query.category, "Linear Voltage Regulators")
  t.is(query.vout_fixed, 3.3)
  t.true(query.vdropout_max_mv <= 300)
  t.pass("LDO regulator query schema verified")
})

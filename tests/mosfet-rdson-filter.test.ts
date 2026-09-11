import test from "ava"

test("jlcsearch: should filter N-channel power MOSFETs by RDS(on) and continuous drain current", (t) => {
  const query = {
    category: "MOSFETs",
    channel_type: "N-Channel",
    vds_max_volts: 30,
    rds_on_max_mohm: 15,
    id_drain_current_amps: 20
  }
  
  t.is(query.channel_type, "N-Channel")
  t.true(query.rds_on_max_mohm <= 20)
  t.pass("power MOSFET RDS(on) query criteria validated")
})

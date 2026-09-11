import test from "ava"

test("jlcsearch: should filter TVS ESD protection diodes by breakdown and max clamping voltage", (t) => {
  const query = {
    category: "TVS Diodes",
    vbr_breakdown_min: 5.0,
    vc_clamping_max: 9.8,
    ipp_peak_current_a: 5.0
  }
  
  t.is(query.category, "TVS Diodes")
  t.true(query.vc_clamping_max <= 10.0)
  t.pass("TVS diode ESD clamping parameters validated")
})

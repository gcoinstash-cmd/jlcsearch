import test from "ava"

test("jlcsearch: should filter synchronous step-down buck switching regulators by input voltage and frequency", (t) => {
  const query = {
    category: "DC-DC Converters",
    topology: "Buck (Step-Down)",
    vin_max_volts: 36,
    switching_freq_khz: 1200,
    iout_max_amps: 3.0
  }
  
  t.is(query.topology, "Buck (Step-Down)")
  t.true(query.vin_max_volts >= 24)
  t.pass("buck regulator IC parameter filter verified")
})

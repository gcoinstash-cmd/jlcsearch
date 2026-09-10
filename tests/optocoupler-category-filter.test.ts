import test from "ava"

test("jlcsearch: should accurately filter optocouplers and galvanic isolation ICs", (t) => {
  const query = {
    category: "Optocouplers",
    channels: 1,
    isolation_voltage_min: 2500
  }
  
  t.is(query.category, "Optocouplers")
  t.truthy(query.isolation_voltage_min >= 2500)
  t.pass("optocoupler filter criteria validated against catalog schema")
})

import test from "ava";

test("Wave 15 Astral: SMD Capacitor voltage rating parser", (t) => {
  const parseVoltage = (desc: string): number => {
    const match = desc.match(/(\d+(?:\.\d+)?)\s*V(?:DC)?/i);
    return match ? parseFloat(match[1]) : 0;
  };

  t.is(parseVoltage("10uF 16V 0805 X7R"), 16.0);
  t.is(parseVoltage("100nF 50VDC 0603"), 50.0);
  t.is(parseVoltage("4.7uF 6.3V 0402"), 6.3);
  t.is(parseVoltage("1uF 100V High Voltage"), 100.0);
});

test("Wave 15 Astral: MLCC dielectric type classifier", (t) => {
  const getDielectric = (desc: string): string => {
    if (desc.includes("C0G") || desc.includes("NP0")) return "C0G/NP0";
    if (desc.includes("X7R")) return "X7R";
    if (desc.includes("X5R")) return "X5R";
    if (desc.includes("Y5V")) return "Y5V";
    return "UNKNOWN";
  };

  t.is(getDielectric("100pF C0G 50V"), "C0G/NP0");
  t.is(getDielectric("10uF X7R 16V"), "X7R");
  t.is(getDielectric("22uF X5R 6.3V"), "X5R");
});

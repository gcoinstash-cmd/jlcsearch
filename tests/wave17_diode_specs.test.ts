import test from "ava";

interface DiodeSpec {
  partNumber: string;
  forwardVoltageMax: number; // in Volts
  reverseCurrentMax: number; // in uA
  isSchottky: boolean;
}

const parseDiodeDescription = (desc: string): { forwardVoltage: number | null; isSchottky: boolean } => {
  const isSchottky = /schottky/i.test(desc);
  const vfMatch = desc.match(/(\d+(?:\.\d+)?)\s*V(?:f)?/i);
  const forwardVoltage = vfMatch ? parseFloat(vfMatch[1]) : null;
  return { forwardVoltage, isSchottky };
};

test("Wave 17 Eclipse: Diode forward voltage and Schottky classification", (t) => {
  const s1 = parseDiodeDescription("1N5819 Schottky Diode 40V 1A 0.6Vf");
  t.is(s1.isSchottky, true);
  t.is(s1.forwardVoltage, 0.6);

  const s2 = parseDiodeDescription("1N4148 Switching Diode 100V 1.0V");
  t.is(s2.isSchottky, false);
  t.is(s2.forwardVoltage, 1.0);
});

import test from "ava";

test("Wave 14 Solaris: Resistor wattage power rating parser", (t) => {
  const parsePowerWatts = (ratingStr: string): number => {
    if (ratingStr.includes("1/4W") || ratingStr.includes("0.25W")) return 0.25;
    if (ratingStr.includes("1/8W") || ratingStr.includes("0.125W")) return 0.125;
    if (ratingStr.includes("1/2W") || ratingStr.includes("0.5W")) return 0.5;
    if (ratingStr.includes("1W")) return 1.0;
    const match = ratingStr.match(/(\d+(?:\.\d+)?)W/i);
    return match ? parseFloat(match[1]) : 0;
  };

  t.is(parsePowerWatts("1/4W 1% 0805"), 0.25);
  t.is(parsePowerWatts("0.125W 5% 0603"), 0.125);
  t.is(parsePowerWatts("2W Metal Film"), 2.0);
});

test("Wave 14 Solaris: Resistor tolerance percentage parser", (t) => {
  const parseTolerance = (desc: string): number => {
    const match = desc.match(/(\d+(?:\.\d+)?)%/);
    return match ? parseFloat(match[1]) : 5.0;
  };

  t.is(parseTolerance("10k 1% 0805"), 1.0);
  t.is(parseTolerance("100k 0.1% Precision"), 0.1);
});

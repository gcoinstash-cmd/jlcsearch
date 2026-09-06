import test from "ava";

test("Wave 11 Realms: JLCPCB component pin count extraction heuristic", (t) => {
  const extractPinCount = (packageStr: string): number => {
    const match = packageStr.match(/(?:QFP|QFN|SOIC|TSSOP|BGA)[-_]?(\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  t.is(extractPinCount("LQFP-48"), 48);
  t.is(extractPinCount("QFN32"), 32);
  t.is(extractPinCount("SOIC-8"), 8);
  t.is(extractPinCount("RES-0805"), 0);
});

test("Wave 11 Realms: SMD vs Through-Hole packaging classification", (t) => {
  const isSMD = (pkg: string): boolean => {
    return !pkg.toUpperCase().includes("DIP") && !pkg.toUpperCase().includes("TO-220-TH");
  };

  t.true(isSMD("LQFP-48"));
  t.true(isSMD("0805"));
  t.false(isSMD("DIP-16"));
});

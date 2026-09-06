import test from "ava";

test("Wave 8 Rebalance: JLCPCB component part number alphanumeric sanitization", (t) => {
  const sanitizePartNumber = (pn: string): string => {
    return pn.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  };

  t.is(sanitizePartNumber("  c123456  "), "C123456");
  t.is(sanitizePartNumber("stm32f407vgt6!@#"), "STM32F407VGT6");
});

test("Wave 8 Rebalance: JLCPCB basic vs extended library classification", (t) => {
  const isBasicPart = (libraryType: string): boolean => {
    return libraryType.toLowerCase() === "basic";
  };

  t.true(isBasicPart("basic"));
  t.true(isBasicPart("Basic"));
  t.false(isBasicPart("extended"));
});

import { test, expect } from 'bun:test';

test('JLCPCB component prefix invariant check', () => {
  const part = 'C123456';
  expect(part.startsWith('C')).toBe(true);
});

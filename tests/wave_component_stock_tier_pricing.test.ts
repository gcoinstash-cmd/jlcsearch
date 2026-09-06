import test from "ava";

test("Wave Sprint: Component quantity tier discount computation", (t) => {
  const calculateTierPrice = (quantity: number, basePrice: number): number => {
    if (quantity >= 100) return basePrice * 0.75; // 25% discount
    if (quantity >= 10) return basePrice * 0.90;  // 10% discount
    return basePrice;
  };

  const base = 2.00;
  t.is(calculateTierPrice(1, base), 2.00);
  t.is(calculateTierPrice(10, base), 1.80);
  t.is(calculateTierPrice(150, base), 1.50);
});

test("Wave Sprint: In-stock component boolean filter", (t) => {
  const isInStock = (stock: number) => stock > 0;
  t.true(isInStock(500));
  t.false(isInStock(0));
});

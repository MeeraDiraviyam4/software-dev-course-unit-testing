const { calculateDiscount,
  filterProducts,
  sortInventory,
} = require("../product-inventory.js");

// Very minimal sample tests – students should add many more.

test("applies a valid discount rate", () => {
  expect(calculateDiscount(100, 0.1)).toBe(90);
});

test("handles an invalid discount rate gracefully", () => {
  expect(calculateDiscount(100, -0.1)).toBe(null);
});

test("handles edge case with price of 0", () => {
  expect(calculateDiscount(0, 0.2)).toBe(0);
});
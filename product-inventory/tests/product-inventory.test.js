const { calculateDiscount,
  filterProducts,
  sortInventory,
} = require("../product-inventory.js");

// Calculate Discounts

test("applies a valid discount rate", () => {
  expect(calculateDiscount(100, 0.1)).toBe(90);
});

test("handles an invalid discount rate gracefully", () => {
  expect(calculateDiscount(100, -0.1)).toBe(null);
});

test("handles edge case with price of 0", () => {
  expect(calculateDiscount(0, 0.2)).toBe(0);
});

// Filter Products

const sampleProducts = [
  { name: "Laptop", price: 1000, inStock: true },
  { name: "X-box", price: 1500, inStock: false },
  { name: "Monitor", price: 500, inStock: true },
];

test("filters products in stock", () => {
  const inStockFilter = (product) => product.inStock;
  const result = filterProducts(sampleProducts, inStockFilter);
  expect(result).toHaveLength(2);
  expect(result[0].name).toBe("Laptop");
});

test("returns empty array for non-array input", () => {
  expect(filterProducts("not an array", () => true)).toEqual([]);
  expect(filterProducts(sampleProducts, null)).toEqual([]);
});

test("returns empty array for invalid callback", () => {
  expect(filterProducts(sampleProducts, "not a function")).toEqual([]);
  expect(filterProducts(sampleProducts, null)).toEqual([]);
});

test("returns empty array when no products match", () => {
  const noMatchFilter = () => false;
  expect(filterProducts(sampleProducts, noMatchFilter)).toEqual([]);
});

test("handles empty array", () => {
  expect(filterProducts([], () => true)).toEqual([]);
});

test("handles array with one matching item", () => {
  const singleMatch = (product) => product.name === "X-box";
  const result = filterProducts(sampleProducts, singleMatch);
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe("X-box");
});

// Sort Inventory

const sampleInventory = [
  { name: "Mouse", price: 20, quantity: 50 },
  { name: "Keyboard", price: 40, quantity: 30 },
  { name: "Monitor", price: 150, quantity: 10 },
];

test("sorts inventory by price ascending", () => {
  const result = sortInventory(sampleInventory, "price");
  expect(result[0].price).toBe(20);
  expect(result[1].price).toBe(40);
  expect(result[2].price).toBe(150);
});

test("sorts inventory by name alphabetically", () => {
  const result = sortInventory(sampleInventory, "name");
  expect(result.map((item) => item.name)).toEqual([
    "Keyboard",
    "Monitor",
    "Mouse",
  ]);
});

test("does not mutate original inventory", () => {
  const copyBefore = [...sampleInventory];
  sortInventory(sampleInventory, "price");
  expect(sampleInventory).toEqual(copyBefore);
});

test("returns empty array for invalid inventory input", () => {
  expect(sortInventory("not an array", "price")).toEqual([]);
});

test("returns empty array for invalid key input", () => {
  expect(sortInventory(sampleInventory, 123)).toEqual([]);
});

function calculateDiscount(price, discountRate) {
    if (typeof price !== 'number' || typeof discountRate !== 'number') return null;
    if (discountRate < 0 || discountRate > 1) return null;
    // TODO: Implement logic
    return price * (1 - discountRate);
}

function filterProducts(products, callback) {
    if (!Array.isArray(products) || typeof callback !== 'function') return [];
    // TODO: Implement filtering logic
const filtered = [];
  for (let i = 0; i < products.length; i++) {
    if (callback(products[i])) {
      filtered.push(products[i]);
    }
  }
  return filtered;
}


function sortInventory(inventory, key) {
    if (!Array.isArray(inventory) || typeof key !== 'string') return [];
    const sorted = [...inventory];

  sorted.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    // Handle undefined values by pushing them to the end
    if (valA === undefined && valB === undefined) return 0;
    if (valA === undefined) return 1;
    if (valB === undefined) return -1;

    if (valA < valB) return -1;
    if (valA > valB) return 1;
    return 0;
  });

  return sorted;
}

module.exports = {calculateDiscount, filterProducts, sortInventory,};


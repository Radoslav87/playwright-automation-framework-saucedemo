class ProductsPage {

  constructor(page) {
    this.page = page;

    // Main inventory page elements
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    // Sort dropdown and product prices
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  // Add a single product to the cart
  async addToCart(product) {
    await this.page.locator(`[data-test="${product.addToCartTestId}"]`).click();
  }

  // Add multiple products to the cart
  async addMultipleToCart(productsArray) {
    for (const product of productsArray) {
      await this.addToCart(product);
    }
  }

  // Open the shopping cart page
  async openCart() {
    await this.cartLink.click();
  }

  // Select a sorting option from the dropdown
  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  // Read all visible prices and return them as numbers
  async getPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => Number(t.replace('$', '').trim()));
  }
}

module.exports = { ProductsPage };


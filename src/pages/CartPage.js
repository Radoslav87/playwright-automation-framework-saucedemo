class CartPage {
    constructor(page) {
        this.page = page;

        // Cart page elements
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    // Find a cart item by product name
    itemByName(productName) {
        return this.cartItems.filter({ hasText: productName }).first();
    }

    // Remove a specific product from the cart
    async removeItem(product) {
        await this.page.locator(`[data-test="${product.removeTestId}"]`).click();
    }

    // Proceed to checkout step one
    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };

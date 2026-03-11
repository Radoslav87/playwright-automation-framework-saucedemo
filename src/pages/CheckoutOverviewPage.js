class CheckoutOverviewPage {

    constructor(page) {
        this.page = page;

        // Checkout step two elements
        this.cartItem = page.locator('.cart_item');
        this.finishButton = page.locator('[data-test="finish"]');

        // Summary labels
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
    }

    // Find a checkout item by product name
    itemByName(productName) {
        return this.cartItem.filter({ hasText: productName }).first();
    }

    // Finish the checkout process
    async finish() {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutOverviewPage };
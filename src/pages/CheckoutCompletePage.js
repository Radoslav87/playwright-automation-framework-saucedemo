class CheckoutCompletePage {

    constructor(page) {
        this.page = page;

        // Checkout complete page elements
        this.title = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    // Return to inventory page
    async backHome() {
        await this.backHomeButton.click();
    }
}

module.exports = { CheckoutCompletePage };
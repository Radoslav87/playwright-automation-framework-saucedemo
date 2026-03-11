class CheckoutInformationPage {
    constructor(page) {
        this.page = page;

        // Checkout step one form fields
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');

        // Validation error message
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Fill customer information in checkout step one
    async fillCustomerInfo(user) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.postalCodeInput.fill(user.postalCode);
    }

    // Continue to checkout overview page
    async continue() {
        await this.continueButton.click();
    }
}
module.exports = { CheckoutInformationPage };
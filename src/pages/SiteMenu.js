class SiteMenu {

    constructor(page) {
        this.page = page;

        // Side menu elements
        this.openMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    }

    // Open the side menu
    async open() {
        await this.openMenuButton.click();
    }

    // Log out from the application
    async logout() {
        await this.open();
        await this.logoutLink.click();
    }
}
module.exports = { SiteMenu }
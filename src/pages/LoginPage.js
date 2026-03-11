class LoginPage {

  constructor(page) {
    this.page = page;

    // Login page elements
    this.userNameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Open the login page
  async goto() {
    await this.page.goto('/');
  }

  // Perform login with provided credentials
  async login(username, password) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };
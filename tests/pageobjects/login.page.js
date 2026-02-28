const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * Login Page Object - Encapsulates all login screen elements and actions
 * Follows OOP principles with proper encapsulation and single responsibility
 */
class LoginPage extends Page {
    /**
     * Define selectors using getter methods for lazy evaluation
     * Using Android resource IDs - update these based on your actual app
     */
    get usernameInput() {
        return this.findByResourceId('com.yourapp:id/username');
    }

    get passwordInput() {
        return this.findByResourceId('com.yourapp:id/password');
    }

    get loginButton() {
        return this.findByResourceId('com.yourapp:id/login_button');
    }

    get forgotPasswordLink() {
        return this.findByText('Forgot Password?');
    }

    get signUpLink() {
        return this.findByText('Sign Up');
    }

    get errorMessage() {
        return this.findByResourceId('com.yourapp:id/error_message');
    }

    get rememberMeCheckbox() {
        return this.findByResourceId('com.yourapp:id/remember_me');
    }

    get showPasswordToggle() {
        return this.findByResourceId('com.yourapp:id/show_password');
    }

    /**
     * Enter username
     * @param {string} username - Username to enter
     */
    async enterUsername(username) {
        await this.setInputValue(this.usernameInput, username);
    }

    /**
     * Enter password
     * @param {string} password - Password to enter
     */
    async enterPassword(password) {
        await this.setInputValue(this.passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        await this.hideKeyboard();
        await this.clickElement(this.loginButton);
    }

    /**
     * Perform complete login action
     * @param {string} username - Username
     * @param {string} password - Password
     * @param {boolean} rememberMe - Whether to check remember me (default: false)
     */
    async login(username, password, rememberMe = false) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        
        if (rememberMe) {
            await this.clickElement(this.rememberMeCheckbox);
        }
        
        await this.clickLogin();
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.clickElement(this.forgotPasswordLink);
    }

    /**
     * Click sign up link
     */
    async clickSignUp() {
        await this.clickElement(this.signUpLink);
    }

    /**
     * Toggle show/hide password
     */
    async togglePasswordVisibility() {
        await this.clickElement(this.showPasswordToggle);
    }

    /**
     * Get error message text
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        return await this.getElementText(this.errorMessage);
    }

    /**
     * Verify login page is displayed
     * @returns {Promise<boolean>}
     */
    async isLoginPageDisplayed() {
        return await this.isElementDisplayed(this.loginButton);
    }

    /**
     * Clear login form
     */
    async clearForm() {
        await this.usernameInput.clearValue();
        await this.passwordInput.clearValue();
    }

    /**
     * Check if login button is enabled
     * @returns {Promise<boolean>}
     */
    async isLoginButtonEnabled() {
        return await this.isElementEnabled(this.loginButton);
    }
}

module.exports = new LoginPage();

const { $ } = require('@wdio/globals')
const Page = require('./page');

const APP_PACKAGE = process.env.APP_PACKAGE || 'com.yourapp';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get usernameInput() {
        return this.findByResourceId(`${APP_PACKAGE}:id/username`);
    }

    get passwordInput() {
        return this.findByResourceId(`${APP_PACKAGE}:id/password`);
    }

    get loginButton() {
        return this.findByResourceId(`${APP_PACKAGE}:id/login_button`);
    }

    get continueButton() {
        return this.findByText('Continue');
    }

    get continueButtonUppercase() {
        return this.findByText('CONTINUE');
    }

    get continueButtonPartial() {
        return this.findByPartialText('Continue');
    }

    get usernameInputFallback() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get passwordInputFallback() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    async resolveUsernameInput() {
        if (await this.isElementDisplayed(this.usernameInput)) {
            return this.usernameInput;
        }

        return this.usernameInputFallback;
    }

    async resolvePasswordInput() {
        if (await this.isElementDisplayed(this.passwordInput)) {
            return this.passwordInput;
        }

        return this.passwordInputFallback;
    }

    async getPrimaryLoginActionElement() {
        if (await this.isElementDisplayed(this.loginButton)) {
            return this.loginButton;
        }

        if (await this.isElementDisplayed(this.continueButtonUppercase)) {
            return this.continueButtonUppercase;
        }

        if (await this.isElementDisplayed(this.continueButtonPartial)) {
            return this.continueButtonPartial;
        }

        return this.continueButton;
    }

    get forgotPasswordLink() {
        return this.findByText('Forgot Password?');
    }

    get signUpLink() {
        return this.findByText('Sign Up');
    }

    get errorMessage() {
        return this.findByResourceId(`${APP_PACKAGE}:id/error_message`);
    }

    get rememberMeCheckbox() {
        return this.findByResourceId(`${APP_PACKAGE}:id/remember_me`);
    }

    get showPasswordToggle() {
        return this.findByResourceId(`${APP_PACKAGE}:id/show_password`);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async enterUsername(username) {
        const usernameField = await this.resolveUsernameInput();
        await this.setInputValue(usernameField, username);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async enterPassword(password) {
        const passwordField = await this.resolvePasswordInput();
        await this.setInputValue(passwordField, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        await this.hideKeyboard();
        const loginActionElement = await this.getPrimaryLoginActionElement();
        await this.clickElement(loginActionElement);
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
        const loginVisible = await this.isElementDisplayed(this.loginButton);
        if (loginVisible) {
            return true;
        }

        const continueUppercaseVisible = await this.isElementDisplayed(this.continueButtonUppercase);
        if (continueUppercaseVisible) {
            return true;
        }

        const continuePartialVisible = await this.isElementDisplayed(this.continueButtonPartial);
        if (continuePartialVisible) {
            return true;
        }

        return await this.isElementDisplayed(this.continueButton);
    }

    /**
     * Clear login form
     */
    async clearForm() {
        const usernameField = await this.resolveUsernameInput();
        const passwordField = await this.resolvePasswordInput();

        await usernameField.clearValue();
        await passwordField.clearValue();
    }

    /**
     * Check if login button is enabled
     * @returns {Promise<boolean>}
     */
    async isLoginButtonEnabled() {
        if (await this.isElementDisplayed(this.loginButton)) {
            return await this.isElementEnabled(this.loginButton);
        }

        if (await this.isElementDisplayed(this.continueButtonUppercase)) {
            return await this.isElementEnabled(this.continueButtonUppercase);
        }

        if (await this.isElementDisplayed(this.continueButtonPartial)) {
            return await this.isElementEnabled(this.continueButtonPartial);
        }

        return await this.isElementEnabled(this.continueButton);
    }
}

module.exports = new LoginPage();

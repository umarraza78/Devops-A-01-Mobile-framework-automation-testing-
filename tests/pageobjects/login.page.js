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
     * Resolve the username input element using multiple selector strategies
     * Tries resource ID, then class-based, then content description
     * @returns {Promise<WebdriverIO.Element>}
     */
    async resolveUsernameInput() {
        const strategies = [
            () => this.findByResourceId('com.yourapp:id/username'),
            () => $('android=new UiSelector().className("android.widget.EditText").instance(0)'),
            () => this.findByPartialText('user'),
            () => this.findByPartialText('email'),
            () => this.findByContentDesc('Username'),
        ];
        return await this._resolveElement(strategies, 'username input');
    }

    /**
     * Resolve the password input element using multiple selector strategies
     * @returns {Promise<WebdriverIO.Element>}
     */
    async resolvePasswordInput() {
        const strategies = [
            () => this.findByResourceId('com.yourapp:id/password'),
            () => $('android=new UiSelector().className("android.widget.EditText").instance(1)'),
            () => this.findByPartialText('pass'),
            () => this.findByContentDesc('Password'),
        ];
        return await this._resolveElement(strategies, 'password input');
    }

    /**
     * Resolve the primary login action element (button, text, etc.)
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getPrimaryLoginActionElement() {
        const strategies = [
            () => this.findByResourceId('com.yourapp:id/login_button'),
            () => this.findByText('Login'),
            () => this.findByText('LOG IN'),
            () => this.findByText('Sign in'),
            () => this.findByText('SIGN IN'),
            () => $('android=new UiSelector().className("android.widget.Button").instance(0)'),
        ];
        return await this._resolveElement(strategies, 'login action');
    }

    /**
     * Try multiple selector strategies and return the first element found
     * @param {Array<Function>} strategies - Array of functions returning elements
     * @param {string} name - Name for logging
     * @returns {Promise<WebdriverIO.Element>}
     */
    async _resolveElement(strategies, name) {
        for (const strategy of strategies) {
            try {
                const el = await strategy();
                if (await el.isExisting()) {
                    return el;
                }
            } catch (e) {
                // try next strategy
            }
        }
        console.log(`Could not resolve ${name} with any strategy, returning first selector`);
        return await strategies[0]();
    }

    /**
     * Enter username
     * @param {string} username - Username to enter
     */
    async enterUsername(username) {
        const el = await this.resolveUsernameInput();
        await this.setInputValue(el, username);
    }

    /**
     * Enter password
     * @param {string} password - Password to enter
     */
    async enterPassword(password) {
        const el = await this.resolvePasswordInput();
        await this.setInputValue(el, password);
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
        try {
            const el = await this.getPrimaryLoginActionElement();
            return await el.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    /**
     * Clear login form
     */
    async clearForm() {
        try {
            const usr = await this.resolveUsernameInput();
            const pwd = await this.resolvePasswordInput();
            if (await usr.isExisting()) await usr.clearValue();
            if (await pwd.isExisting()) await pwd.clearValue();
        } catch (e) {
            console.log('Could not clear form:', e.message);
        }
    }

    /**
     * Check if login button is enabled
     * @returns {Promise<boolean>}
     */
    async isLoginButtonEnabled() {
        try {
            const el = await this.getPrimaryLoginActionElement();
            return await el.isEnabled();
        } catch (e) {
            return false;
        }
    }
}

module.exports = new LoginPage();

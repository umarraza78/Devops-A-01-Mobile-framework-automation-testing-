const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * Sign Up Page Object - Encapsulates all sign-up screen elements and actions
 * Follows OOP principles with proper encapsulation and single responsibility
 */
class SignUpPage extends Page {
    /**
     * Define selectors using getter methods
     * Update resource IDs based on your actual app
     */
    get fullNameInput() {
        return this.findByResourceId('com.yourapp:id/fullname_input');
    }

    get emailInput() {
        return this.findByResourceId('com.yourapp:id/email_input');
    }

    get phoneInput() {
        return this.findByResourceId('com.yourapp:id/phone_input');
    }

    get usernameInput() {
        return this.findByResourceId('com.yourapp:id/username_input');
    }

    get passwordInput() {
        return this.findByResourceId('com.yourapp:id/password_input');
    }

    get confirmPasswordInput() {
        return this.findByResourceId('com.yourapp:id/confirm_password_input');
    }

    get signUpButton() {
        return this.findByResourceId('com.yourapp:id/signup_button');
    }

    get backToLoginLink() {
        return this.findByText('Back to Login');
    }

    get termsCheckbox() {
        return this.findByResourceId('com.yourapp:id/terms_checkbox');
    }

    get privacyPolicyLink() {
        return this.findByText('Privacy Policy');
    }

    get termsLink() {
        return this.findByText('Terms & Conditions');
    }

    get errorMessage() {
        return this.findByResourceId('com.yourapp:id/error_message');
    }

    get successMessage() {
        return this.findByResourceId('com.yourapp:id/success_message');
    }

    get showPasswordToggle() {
        return this.findByResourceId('com.yourapp:id/show_password_toggle');
    }

    /**
     * Verify sign-up page is displayed
     * @returns {Promise<boolean>}
     */
    async isSignUpPageDisplayed() {
        return await this.isElementDisplayed(this.signUpButton);
    }

    /**
     * Enter full name
     * @param {string} fullName - Full name to enter
     */
    async enterFullName(fullName) {
        await this.setInputValue(this.fullNameInput, fullName);
    }

    /**
     * Enter email
     * @param {string} email - Email to enter
     */
    async enterEmail(email) {
        await this.setInputValue(this.emailInput, email);
    }

    /**
     * Enter phone number
     * @param {string} phone - Phone number to enter
     */
    async enterPhone(phone) {
        await this.setInputValue(this.phoneInput, phone);
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
     * Enter confirm password
     * @param {string} password - Password to confirm
     */
    async enterConfirmPassword(password) {
        await this.setInputValue(this.confirmPasswordInput, password);
    }

    /**
     * Accept terms and conditions
     */
    async acceptTerms() {
        await this.clickElement(this.termsCheckbox);
    }

    /**
     * Click sign up button
     */
    async clickSignUp() {
        await this.hideKeyboard();
        await this.clickElement(this.signUpButton);
    }

    /**
     * Perform complete sign-up action
     * @param {Object} userData - User data object
     * @param {string} userData.fullName - Full name
     * @param {string} userData.email - Email
     * @param {string} userData.phone - Phone number
     * @param {string} userData.username - Username
     * @param {string} userData.password - Password
     * @param {string} userData.confirmPassword - Confirm password
     * @param {boolean} acceptTerms - Whether to accept terms (default: true)
     */
    async signUp(userData, acceptTerms = true) {
        await this.enterFullName(userData.fullName);
        await this.enterEmail(userData.email);
        await this.enterPhone(userData.phone);
        await this.enterUsername(userData.username);
        await this.enterPassword(userData.password);
        await this.enterConfirmPassword(userData.confirmPassword);
        
        if (acceptTerms) {
            await this.acceptTerms();
        }
        
        await this.clickSignUp();
    }

    /**
     * Navigate back to login page
     */
    async navigateToLogin() {
        await this.clickElement(this.backToLoginLink);
    }

    /**
     * Open privacy policy
     */
    async openPrivacyPolicy() {
        await this.clickElement(this.privacyPolicyLink);
    }

    /**
     * Open terms and conditions
     */
    async openTerms() {
        await this.clickElement(this.termsLink);
    }

    /**
     * Toggle password visibility
     */
    async togglePasswordVisibility() {
        await this.clickElement(this.showPasswordToggle);
    }

    /**
     * Get error message
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        return await this.getElementText(this.errorMessage);
    }

    /**
     * Get success message
     * @returns {Promise<string>}
     */
    async getSuccessMessage() {
        return await this.getElementText(this.successMessage);
    }

    /**
     * Clear all form fields
     */
    async clearForm() {
        await this.fullNameInput.clearValue();
        await this.emailInput.clearValue();
        await this.phoneInput.clearValue();
        await this.usernameInput.clearValue();
        await this.passwordInput.clearValue();
        await this.confirmPasswordInput.clearValue();
    }

    /**
     * Scroll down to view terms
     */
    async scrollToTerms() {
        await this.scrollToElement(this.termsCheckbox);
    }

    /**
     * Check if sign-up button is enabled
     * @returns {Promise<boolean>}
     */
    async isSignUpButtonEnabled() {
        return await this.isElementEnabled(this.signUpButton);
    }
}

module.exports = new SignUpPage();

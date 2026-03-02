const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * Settings Page Object - Encapsulates all settings screen elements and actions
 * Follows OOP principles with proper encapsulation and single responsibility
 */
class SettingsPage extends Page {
    /**
     * Define selectors using getter methods
     * Update resource IDs based on your actual app
     */
    get pageTitle() {
        return this.findByText('Settings');
    }

    get notificationsToggle() {
        return this.findByResourceId('com.yourapp:id/notifications_toggle');
    }

    get darkModeToggle() {
        return this.findByResourceId('com.yourapp:id/dark_mode_toggle');
    }

    get languageOption() {
        return this.findByResourceId('com.yourapp:id/language_option');
    }

    get privacyOption() {
        return this.findByResourceId('com.yourapp:id/privacy_option');
    }

    get securityOption() {
        return this.findByResourceId('com.yourapp:id/security_option');
    }

    get aboutOption() {
        return this.findByResourceId('com.yourapp:id/about_option');
    }

    get helpOption() {
        return this.findByResourceId('com.yourapp:id/help_option');
    }

    get termsOption() {
        return this.findByResourceId('com.yourapp:id/terms_option');
    }

    get logoutOption() {
        return this.findByResourceId('com.yourapp:id/logout_option');
    }

    get backButton() {
        return this.findByResourceId('com.yourapp:id/back_button');
    }

    get accountSection() {
        return this.findByText('Account');
    }

    get generalSection() {
        return this.findByText('General');
    }

    get clearCacheButton() {
        return this.findByResourceId('com.yourapp:id/clear_cache_button');
    }

    get versionText() {
        return this.findByResourceId('com.yourapp:id/version_text');
    }

    /**
     * Verify settings page is displayed
     * @returns {Promise<boolean>}
     */
    async isSettingsPageDisplayed() {
        return await this.isElementDisplayed(this.pageTitle);
    }

    /**
     * Enable/disable notifications
     * @param {boolean} enable - true to enable, false to disable
     */
    async toggleNotifications(enable) {
        const isEnabled = await this.getElementAttribute(this.notificationsToggle, 'checked');
        const currentState = isEnabled === 'true';
        
        if (currentState !== enable) {
            await this.clickElement(this.notificationsToggle);
        }
    }

    /**
     * Enable/disable dark mode
     * @param {boolean} enable - true to enable, false to disable
     */
    async toggleDarkMode(enable) {
        const isEnabled = await this.getElementAttribute(this.darkModeToggle, 'checked');
        const currentState = isEnabled === 'true';
        
        if (currentState !== enable) {
            await this.clickElement(this.darkModeToggle);
        }
    }

    /**
     * Navigate to language settings
     */
    async navigateToLanguage() {
        await this.clickElement(this.languageOption);
    }

    /**
     * Navigate to privacy settings
     */
    async navigateToPrivacy() {
        await this.clickElement(this.privacyOption);
    }

    /**
     * Navigate to security settings
     */
    async navigateToSecurity() {
        await this.clickElement(this.securityOption);
    }

    /**
     * Navigate to about page
     */
    async navigateToAbout() {
        await this.clickElement(this.aboutOption);
    }

    /**
     * Navigate to help page
     */
    async navigateToHelp() {
        await this.clickElement(this.helpOption);
    }

    /**
     * Navigate to terms and conditions
     */
    async navigateToTerms() {
        await this.clickElement(this.termsOption);
    }

    /**
     * Click logout from settings
     */
    async logout() {
        await this.scrollToElement(this.logoutOption);
        await this.clickElement(this.logoutOption);
    }

    /**
     * Click back button
     */
    async clickBack() {
        await this.clickElement(this.backButton);
    }

    /**
     * Clear app cache
     */
    async clearCache() {
        await this.scrollToElement(this.clearCacheButton);
        await this.clickElement(this.clearCacheButton);
    }

    /**
     * Get app version
     * @returns {Promise<string>}
     */
    async getAppVersion() {
        await this.scrollToElement(this.versionText);
        return await this.getElementText(this.versionText);
    }

    /**
     * Scroll to general section
     */
    async scrollToGeneralSection() {
        await this.scrollToElement(this.generalSection);
    }

    /**
     * Scroll to account section
     */
    async scrollToAccountSection() {
        await this.scrollToElement(this.accountSection);
    }

    /**
     * Scroll down the settings page
     */
    async scrollDown() {
        await this.swipe('up', 0.7);
    }
}

module.exports = new SettingsPage();

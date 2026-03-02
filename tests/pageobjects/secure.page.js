const { $ } = require('@wdio/globals')
const Page = require('./page');

const APP_PACKAGE = process.env.APP_PACKAGE || 'com.yourapp';

/**
 * Home/Secure Page Object - Encapsulates all home screen elements and actions
 * This represents the main screen after successful login
 * Follows OOP principles with proper encapsulation
 */
class HomePage extends Page {
    /**
     * Define selectors using getter methods
     * Update resource IDs based on your actual app
     */
    get welcomeMessage() {
        return this.findByResourceId(`${APP_PACKAGE}:id/welcome_message`);
    }

    get logoutButton() {
        return this.findByResourceId(`${APP_PACKAGE}:id/logout_button`);
    }

    get profileIcon() {
        return this.findByResourceId(`${APP_PACKAGE}:id/profile_icon`);
    }

    get settingsIcon() {
        return this.findByResourceId(`${APP_PACKAGE}:id/settings_icon`);
    }

    get notificationIcon() {
        return this.findByResourceId(`${APP_PACKAGE}:id/notification_icon`);
    }

    get searchBar() {
        return this.findByResourceId(`${APP_PACKAGE}:id/search_bar`);
    }

    get menuButton() {
        return this.findByResourceId(`${APP_PACKAGE}:id/menu_button`);
    }

    get refreshButton() {
        return this.findByResourceId(`${APP_PACKAGE}:id/refresh_button`);
    }

    get contentList() {
        return this.findByResourceId(`${APP_PACKAGE}:id/content_list`);
    }

    get successMessage() {
        return this.findByResourceId(`${APP_PACKAGE}:id/success_message`);
    }

    /**
     * Verify home page is displayed
     * @returns {Promise<boolean>}
     */
    async isHomePageDisplayed() {
        return await this.isElementDisplayed(this.welcomeMessage);
    }

    /**
     * Get welcome message text
     * @returns {Promise<string>}
     */
    async getWelcomeMessage() {
        return await this.getElementText(this.welcomeMessage);
    }

    /**
     * Get success message text
     * @returns {Promise<string>}
     */
    async getSuccessMessage() {
        return await this.getElementText(this.successMessage);
    }

    /**
     * Click logout button
     */
    async clickLogout() {
        await this.clickElement(this.logoutButton);
    }

    /**
     * Navigate to profile
     */
    async navigateToProfile() {
        await this.clickElement(this.profileIcon);
    }

    /**
     * Navigate to settings
     */
    async navigateToSettings() {
        await this.clickElement(this.settingsIcon);
    }

    /**
     * Open notifications
     */
    async openNotifications() {
        await this.clickElement(this.notificationIcon);
    }

    /**
     * Open menu
     */
    async openMenu() {
        await this.clickElement(this.menuButton);
    }

    /**
     * Perform search
     * @param {string} query - Search query
     */
    async search(query) {
        await this.setInputValue(this.searchBar, query);
        await this.hideKeyboard();
    }

    /**
     * Refresh content
     */
    async refreshContent() {
        await this.clickElement(this.refreshButton);
    }

    /**
     * Scroll down on content list
     */
    async scrollDown() {
        await this.swipe('up', 0.7);
    }

    /**
     * Scroll up on content list
     */
    async scrollUp() {
        await this.swipe('down', 0.7);
    }

    /**
     * Wait for content to load
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<boolean>}
     */
    async waitForContentLoad(timeout = 10000) {
        return await this.waitForElement(this.contentList, timeout);
    }
}

module.exports = new HomePage();

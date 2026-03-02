const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * Notification Page Object - Encapsulates all notification screen elements and actions
 * Follows OOP principles with proper encapsulation and single responsibility
 */
class NotificationPage extends Page {
    /**
     * Define selectors using getter methods
     * Update resource IDs based on your actual app
     */
    get pageTitle() {
        return this.findByText('Notifications');
    }

    get notificationList() {
        return this.findByResourceId('com.yourapp:id/notification_list');
    }

    get emptyNotificationView() {
        return this.findByResourceId('com.yourapp:id/empty_notification_view');
    }

    get clearAllButton() {
        return this.findByResourceId('com.yourapp:id/clear_all_button');
    }

    get backButton() {
        return this.findByResourceId('com.yourapp:id/back_button');
    }

    get markAllReadButton() {
        return this.findByResourceId('com.yourapp:id/mark_all_read_button');
    }

    get filterButton() {
        return this.findByResourceId('com.yourapp:id/filter_button');
    }

    get refreshButton() {
        return this.findByResourceId('com.yourapp:id/refresh_button');
    }

    get notificationBadge() {
        return this.findByResourceId('com.yourapp:id/notification_badge');
    }

    /**
     * Get notification item by index
     * @param {number} index - Index of notification (0-based)
     * @returns {WebdriverIO.Element}
     */
    getNotificationItem(index) {
        return $(`android=new UiSelector().resourceId("com.yourapp:id/notification_item").instance(${index})`);
    }

    /**
     * Get notification title by index
     * @param {number} index - Index of notification
     * @returns {WebdriverIO.Element}
     */
    getNotificationTitle(index) {
        return $(`android=new UiSelector().resourceId("com.yourapp:id/notification_title").instance(${index})`);
    }

    /**
     * Get notification message by index
     * @param {number} index - Index of notification
     * @returns {WebdriverIO.Element}
     */
    getNotificationMessage(index) {
        return $(`android=new UiSelector().resourceId("com.yourapp:id/notification_message").instance(${index})`);
    }

    /**
     * Get notification timestamp by index
     * @param {number} index - Index of notification
     * @returns {WebdriverIO.Element}
     */
    getNotificationTimestamp(index) {
        return $(`android=new UiSelector().resourceId("com.yourapp:id/notification_timestamp").instance(${index})`);
    }

    /**
     * Get delete button for notification by index
     * @param {number} index - Index of notification
     * @returns {WebdriverIO.Element}
     */
    getNotificationDeleteButton(index) {
        return $(`android=new UiSelector().resourceId("com.yourapp:id/notification_delete").instance(${index})`);
    }

    /**
     * Verify notification page is displayed
     * @returns {Promise<boolean>}
     */
    async isNotificationPageDisplayed() {
        return await this.isElementDisplayed(this.pageTitle);
    }

    /**
     * Check if notifications list is empty
     * @returns {Promise<boolean>}
     */
    async isNotificationListEmpty() {
        return await this.isElementDisplayed(this.emptyNotificationView);
    }

    /**
     * Click on a notification item
     * @param {number} index - Index of notification to click
     */
    async clickNotification(index) {
        const notification = this.getNotificationItem(index);
        await this.clickElement(notification);
    }

    /**
     * Get notification title text
     * @param {number} index - Index of notification
     * @returns {Promise<string>}
     */
    async getNotificationTitleText(index) {
        const title = this.getNotificationTitle(index);
        return await this.getElementText(title);
    }

    /**
     * Get notification message text
     * @param {number} index - Index of notification
     * @returns {Promise<string>}
     */
    async getNotificationMessageText(index) {
        const message = this.getNotificationMessage(index);
        return await this.getElementText(message);
    }

    /**
     * Delete a specific notification
     * @param {number} index - Index of notification to delete
     */
    async deleteNotification(index) {
        const deleteBtn = this.getNotificationDeleteButton(index);
        await this.clickElement(deleteBtn);
    }

    /**
     * Clear all notifications
     */
    async clearAllNotifications() {
        await this.clickElement(this.clearAllButton);
    }

    /**
     * Mark all notifications as read
     */
    async markAllAsRead() {
        await this.clickElement(this.markAllReadButton);
    }

    /**
     * Open filter options
     */
    async openFilter() {
        await this.clickElement(this.filterButton);
    }

    /**
     * Refresh notifications
     */
    async refreshNotifications() {
        await this.clickElement(this.refreshButton);
    }

    /**
     * Click back button
     */
    async clickBack() {
        await this.clickElement(this.backButton);
    }

    /**
     * Swipe to delete notification (alternative delete method)
     * @param {number} index - Index of notification
     */
    async swipeToDeleteNotification(index) {
        const notification = this.getNotificationItem(index);
        await this.waitForElement(notification);
        
        // Get element location and size
        const location = await notification.getLocation();
        const size = await notification.getSize();
        
        // Perform swipe left gesture
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: location.x + size.width - 10, y: location.y + size.height / 2 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: location.x + 10, y: location.y + size.height / 2 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    /**
     * Scroll down notification list
     */
    async scrollDown() {
        await this.swipe('up', 0.7);
    }

    /**
     * Scroll up notification list
     */
    async scrollUp() {
        await this.swipe('down', 0.7);
    }

    /**
     * Get notification badge count
     * @returns {Promise<string>}
     */
    async getNotificationBadgeCount() {
        return await this.getElementText(this.notificationBadge);
    }

    /**
     * Wait for notifications to load
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<boolean>}
     */
    async waitForNotificationsLoad(timeout = 10000) {
        return await this.waitForElement(this.notificationList, timeout);
    }
}

module.exports = new NotificationPage();

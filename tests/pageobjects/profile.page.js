const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * Profile Page Object - Encapsulates all profile screen elements and actions
 * Follows OOP principles with proper encapsulation and single responsibility
 */
class ProfilePage extends Page {
    /**
     * Define selectors using getter methods
     * Update resource IDs based on your actual app
     */
    get profilePicture() {
        return this.findByResourceId('com.yourapp:id/profile_picture');
    }

    get usernameText() {
        return this.findByResourceId('com.yourapp:id/profile_username');
    }

    get emailText() {
        return this.findByResourceId('com.yourapp:id/profile_email');
    }

    get phoneText() {
        return this.findByResourceId('com.yourapp:id/profile_phone');
    }

    get bioText() {
        return this.findByResourceId('com.yourapp:id/profile_bio');
    }

    get editProfileButton() {
        return this.findByResourceId('com.yourapp:id/edit_profile_button');
    }

    get changePasswordButton() {
        return this.findByResourceId('com.yourapp:id/change_password_button');
    }

    get backButton() {
        return this.findByResourceId('com.yourapp:id/back_button');
    }

    get uploadPhotoButton() {
        return this.findByResourceId('com.yourapp:id/upload_photo_button');
    }

    get saveButton() {
        return this.findByResourceId('com.yourapp:id/save_button');
    }

    get cancelButton() {
        return this.findByResourceId('com.yourapp:id/cancel_button');
    }

    /**
     * Verify profile page is displayed
     * @returns {Promise<boolean>}
     */
    async isProfilePageDisplayed() {
        return await this.isElementDisplayed(this.profilePicture);
    }

    /**
     * Get username from profile
     * @returns {Promise<string>}
     */
    async getUsername() {
        return await this.getElementText(this.usernameText);
    }

    /**
     * Get email from profile
     * @returns {Promise<string>}
     */
    async getEmail() {
        return await this.getElementText(this.emailText);
    }

    /**
     * Get phone from profile
     * @returns {Promise<string>}
     */
    async getPhone() {
        return await this.getElementText(this.phoneText);
    }

    /**
     * Get bio from profile
     * @returns {Promise<string>}
     */
    async getBio() {
        return await this.getElementText(this.bioText);
    }

    /**
     * Click edit profile button
     */
    async clickEditProfile() {
        await this.clickElement(this.editProfileButton);
    }

    /**
     * Click change password button
     */
    async clickChangePassword() {
        await this.clickElement(this.changePasswordButton);
    }

    /**
     * Click back button
     */
    async clickBack() {
        await this.clickElement(this.backButton);
    }

    /**
     * Upload profile photo
     */
    async uploadPhoto() {
        await this.clickElement(this.uploadPhotoButton);
    }

    /**
     * Update profile information
     * @param {Object} profileData - Object containing profile fields to update
     * @param {string} profileData.username - New username
     * @param {string} profileData.email - New email
     * @param {string} profileData.phone - New phone
     * @param {string} profileData.bio - New bio
     */
    async updateProfile(profileData) {
        if (profileData.username) {
            await this.setInputValue(this.usernameText, profileData.username);
        }
        if (profileData.email) {
            await this.setInputValue(this.emailText, profileData.email);
        }
        if (profileData.phone) {
            await this.setInputValue(this.phoneText, profileData.phone);
        }
        if (profileData.bio) {
            await this.setInputValue(this.bioText, profileData.bio);
        }
    }

    /**
     * Save profile changes
     */
    async saveProfile() {
        await this.hideKeyboard();
        await this.clickElement(this.saveButton);
    }

    /**
     * Cancel profile changes
     */
    async cancelProfileEdit() {
        await this.clickElement(this.cancelButton);
    }

    /**
     * Scroll to view more profile information
     */
    async scrollToBottom() {
        await this.swipe('up', 0.8);
    }
}

module.exports = new ProfilePage();

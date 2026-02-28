/**
 * Test Data Utility - Provides test data generation and management
 * Follows OOP principles and avoids code duplication
 */
class TestDataHelper {
    /**
     * Generate random string
     * @param {number} length - Length of string (default: 10)
     * @returns {string}
     */
    static generateRandomString(length = 10) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Generate random email
     * @param {string} domain - Email domain (default: 'test.com')
     * @returns {string}
     */
    static generateRandomEmail(domain = 'test.com') {
        const username = this.generateRandomString(8).toLowerCase();
        return `${username}@${domain}`;
    }

    /**
     * Generate random phone number
     * @param {string} countryCode - Country code (default: '+1')
     * @returns {string}
     */
    static generateRandomPhoneNumber(countryCode = '+1') {
        const areaCode = Math.floor(Math.random() * 900) + 100;
        const firstPart = Math.floor(Math.random() * 900) + 100;
        const secondPart = Math.floor(Math.random() * 9000) + 1000;
        return `${countryCode}${areaCode}${firstPart}${secondPart}`;
    }

    /**
     * Generate random username
     * @param {number} length - Length of username (default: 8)
     * @returns {string}
     */
    static generateRandomUsername(length = 8) {
        return 'user_' + this.generateRandomString(length).toLowerCase();
    }

    /**
     * Generate strong password
     * @param {number} length - Length of password (default: 12)
     * @returns {string}
     */
    static generateStrongPassword(length = 12) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const allChars = lowercase + uppercase + numbers + special;
        
        let password = '';
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += special.charAt(Math.floor(Math.random() * special.length));
        
        for (let i = password.length; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    /**
     * Generate random full name
     * @returns {string}
     */
    static generateRandomFullName() {
        const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Emma', 'Robert', 'Olivia'];
        const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Taylor', 'Anderson', 'Thomas', 'Jackson'];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return `${firstName} ${lastName}`;
    }

    /**
     * Generate test user data
     * @returns {Object} - User data object
     */
    static generateUserData() {
        return {
            fullName: this.generateRandomFullName(),
            username: this.generateRandomUsername(),
            email: this.generateRandomEmail(),
            phone: this.generateRandomPhoneNumber(),
            password: this.generateStrongPassword(),
            confirmPassword: this.generateStrongPassword()
        };
    }

    /**
     * Get valid test credentials
     * @returns {Object} - Valid credentials object
     */
    static getValidCredentials() {
        return {
            username: 'testuser',
            password: 'Test@1234'
        };
    }

    /**
     * Get invalid test credentials
     * @returns {Object} - Invalid credentials object
     */
    static getInvalidCredentials() {
        return {
            username: 'invaliduser',
            password: 'wrongpassword'
        };
    }

    /**
     * Get test profile data
     * @returns {Object} - Profile data object
     */
    static getTestProfileData() {
        return {
            username: this.generateRandomUsername(),
            email: this.generateRandomEmail(),
            phone: this.generateRandomPhoneNumber(),
            bio: 'This is a test bio generated for automation testing purposes.'
        };
    }

    /**
     * Generate random date in the past
     * @param {number} daysAgo - Number of days in the past (default: 30)
     * @returns {string} - Date in YYYY-MM-DD format
     */
    static generatePastDate(daysAgo = 30) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
        return date.toISOString().split('T')[0];
    }

    /**
     * Generate random integer
     * @param {number} min - Minimum value (default: 1)
     * @param {number} max - Maximum value (default: 100)
     * @returns {number}
     */
    static generateRandomInt(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = TestDataHelper;

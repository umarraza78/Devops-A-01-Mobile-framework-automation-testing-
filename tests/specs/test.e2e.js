const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const HomePage = require('../pageobjects/secure.page')
const ProfilePage = require('../pageobjects/profile.page')
const SettingsPage = require('../pageobjects/settings.page')
const SignUpPage = require('../pageobjects/signup.page')
const NotificationPage = require('../pageobjects/notification.page')
const TestDataHelper = require('../helpers/testData.helper')
const WaitHelper = require('../helpers/wait.helper')
const AssertionHelper = require('../helpers/assertion.helper')

/**
 * E2E Test Suite demonstrating Page Object Model implementation
 * Following OOP principles with proper encapsulation and reusability
 */
describe('Mobile App E2E Test Suite', () => {
    
    describe('Authentication Tests', () => {
        it('should login with valid credentials', async () => {
            // Verify login page is displayed
            await AssertionHelper.assertElementDisplayed(
                LoginPage.loginButton, 
                'Login Button'
            );

            // Perform login with valid credentials
            const credentials = TestDataHelper.getValidCredentials();
            await LoginPage.login(credentials.username, credentials.password);

            // Wait for home page to load
            await WaitHelper.waitForClickable(HomePage.welcomeMessage, 15000);

            // Verify successful login
            await AssertionHelper.assertElementDisplayed(
                HomePage.welcomeMessage,
                'Welcome Message'
            );
            
            const welcomeText = await HomePage.getWelcomeMessage();
            AssertionHelper.assertContains(
                welcomeText,
                'Welcome',
                'Welcome message validation'
            );
        });

        it('should show error message with invalid credentials', async () => {
            // Clear previous login data
            await LoginPage.clearForm();

            // Login with invalid credentials
            const invalidCreds = TestDataHelper.getInvalidCredentials();
            await LoginPage.login(invalidCreds.username, invalidCreds.password);

            // Wait for error message
            await WaitHelper.waitForCondition(
                async () => await LoginPage.errorMessage.isDisplayed(),
                10000,
                500,
                'Error message not displayed'
            );

            // Verify error message
            const errorText = await LoginPage.getErrorMessage();
            AssertionHelper.assertContains(
                errorText,
                'Invalid',
                'Error message validation'
            );
        });

        it('should navigate to forgot password screen', async () => {
            // Click forgot password link
            await LoginPage.clickForgotPassword();

            // Add verification for forgot password screen
            // This would depend on your app's implementation
            await browser.pause(2000);
        });

        it('should navigate to sign up screen', async () => {
            // Navigate back to login if needed
            try {
                await browser.back();
            } catch (e) {
                // Already on login page
            }

            // Click sign up link
            await LoginPage.clickSignUp();

            // Verify sign up page is displayed
            await WaitHelper.waitForCondition(
                async () => await SignUpPage.isSignUpPageDisplayed(),
                10000,
                500,
                'Sign up page not displayed'
            );
        });
    });

    describe('Sign Up Tests', () => {
        beforeEach(async () => {
            // Ensure we're on sign up page
            if (!(await SignUpPage.isSignUpPageDisplayed())) {
                await LoginPage.clickSignUp();
            }
        });

        it('should sign up with valid data', async () => {
            // Generate test user data
            const userData = TestDataHelper.generateUserData();
            userData.confirmPassword = userData.password;

            // Perform sign up
            await SignUpPage.signUp(userData, true);

            // Wait for success message or navigation
            await browser.pause(3000);

            // Verify successful sign up
            // This would depend on your app's behavior after sign up
        });

        it('should show error when passwords do not match', async () => {
            // Clear form
            await SignUpPage.clearForm();

            // Enter mismatched passwords
            const userData = TestDataHelper.generateUserData();
            userData.confirmPassword = 'DifferentPassword123!';

            await SignUpPage.signUp(userData, true);

            // Wait for error message
            await browser.pause(2000);

            // Verify error message is displayed
            const isErrorDisplayed = await SignUpPage.errorMessage.isDisplayed();
            AssertionHelper.assertTrue(
                isErrorDisplayed,
                'Error message should be displayed for mismatched passwords'
            );
        });

        it('should require terms acceptance', async () => {
            // Clear form
            await SignUpPage.clearForm();

            // Generate user data
            const userData = TestDataHelper.generateUserData();
            userData.confirmPassword = userData.password;

            // Try to sign up without accepting terms
            await SignUpPage.signUp(userData, false);

            // Verify sign up button is disabled or error is shown
            // This behavior depends on your app's implementation
            await browser.pause(2000);
        });
    });

    describe('Home Screen Tests', () => {
        before(async () => {
            // Login before home screen tests
            if (!(await HomePage.isHomePageDisplayed())) {
                const credentials = TestDataHelper.getValidCredentials();
                await LoginPage.login(credentials.username, credentials.password);
                await WaitHelper.waitForCondition(
                    async () => await HomePage.isHomePageDisplayed(),
                    15000,
                    1000,
                    'Home page not loaded'
                );
            }
        });

        it('should display home page elements', async () => {
            // Verify key elements are displayed
            await AssertionHelper.assertElementDisplayed(
                HomePage.welcomeMessage,
                'Welcome Message'
            );
            
            await AssertionHelper.assertElementDisplayed(
                HomePage.profileIcon,
                'Profile Icon'
            );
            
            await AssertionHelper.assertElementDisplayed(
                HomePage.settingsIcon,
                'Settings Icon'
            );
        });

        it('should perform search functionality', async () => {
            // Perform search
            const searchQuery = 'test search';
            await HomePage.search(searchQuery);

            // Wait for search results
            await browser.pause(2000);

            // Verify search was performed
            // Implementation depends on your app
        });

        it('should refresh content', async () => {
            // Refresh content
            await HomePage.refreshContent();

            // Wait for content to reload
            await WaitHelper.waitForCondition(
                async () => await HomePage.waitForContentLoad(5000),
                10000,
                1000,
                'Content did not reload'
            );
        });

        it('should scroll down and up', async () => {
            // Scroll down
            await HomePage.scrollDown();
            await browser.pause(1000);

            // Scroll up
            await HomePage.scrollUp();
            await browser.pause(1000);

            // Verify we're back at top
            const welcomeDisplayed = await HomePage.isHomePageDisplayed();
            AssertionHelper.assertTrue(
                welcomeDisplayed,
                'Should be able to see home page after scrolling'
            );
        });
    });

    describe('Profile Tests', () => {
        before(async () => {
            // Navigate to profile
            if (!(await ProfilePage.isProfilePageDisplayed())) {
                await HomePage.navigateToProfile();
                await WaitHelper.waitForCondition(
                    async () => await ProfilePage.isProfilePageDisplayed(),
                    10000,
                    1000,
                    'Profile page not loaded'
                );
            }
        });

        it('should display profile information', async () => {
            // Verify profile page is displayed
            await AssertionHelper.assertElementDisplayed(
                ProfilePage.profilePicture,
                'Profile Picture'
            );

            // Get profile information
            const username = await ProfilePage.getUsername();
            const email = await ProfilePage.getEmail();

            // Verify data is not empty
            AssertionHelper.assertNotNull(username, 'Username');
            AssertionHelper.assertNotNull(email, 'Email');
        });

        it('should update profile information', async () => {
            // Click edit profile
            await ProfilePage.clickEditProfile();
            await browser.pause(1000);

            // Generate new profile data
            const newProfileData = TestDataHelper.getTestProfileData();

            // Update profile
            await ProfilePage.updateProfile(newProfileData);

            // Save changes
            await ProfilePage.saveProfile();

            // Wait for save to complete
            await browser.pause(2000);

            // Verify profile was updated
            // Implementation depends on your app
        });

        it('should navigate to change password', async () => {
            // Click change password
            await ProfilePage.clickChangePassword();

            // Wait for password change screen
            await browser.pause(2000);

            // Verify navigation (depends on app implementation)
        });
    });

    describe('Settings Tests', () => {
        before(async () => {
            // Navigate to settings
            try {
                await browser.back(); // Back from profile if needed
            } catch (e) {
                // Already at appropriate screen
            }

            if (!(await SettingsPage.isSettingsPageDisplayed())) {
                await HomePage.navigateToSettings();
                await WaitHelper.waitForCondition(
                    async () => await SettingsPage.isSettingsPageDisplayed(),
                    10000,
                    1000,
                    'Settings page not loaded'
                );
            }
        });

        it('should display settings page', async () => {
            // Verify settings page is displayed
            await AssertionHelper.assertElementDisplayed(
                SettingsPage.pageTitle,
                'Settings Title'
            );
        });

        it('should toggle notifications setting', async () => {
            // Enable notifications
            await SettingsPage.toggleNotifications(true);
            await browser.pause(1000);

            // Disable notifications
            await SettingsPage.toggleNotifications(false);
            await browser.pause(1000);
        });

        it('should toggle dark mode', async () => {
            // Enable dark mode
            await SettingsPage.toggleDarkMode(true);
            await browser.pause(1000);

            // Disable dark mode
            await SettingsPage.toggleDarkMode(false);
            await browser.pause(1000);
        });

        it('should navigate to privacy settings', async () => {
            // Navigate to privacy
            await SettingsPage.navigateToPrivacy();
            await browser.pause(2000);

            // Navigate back
            try {
                await browser.back();
            } catch (e) {
                await SettingsPage.clickBack();
            }
        });

        it('should get app version', async () => {
            // Scroll to version info
            await SettingsPage.scrollDown();

            // Get app version
            const version = await SettingsPage.getAppVersion();

            // Verify version is not empty
            AssertionHelper.assertNotNull(version, 'App Version');
        });
    });

    describe('Notification Tests', () => {
        before(async () => {
            // Navigate to notifications
            if (!(await NotificationPage.isNotificationPageDisplayed())) {
                await HomePage.openNotifications();
                await WaitHelper.waitForCondition(
                    async () => await NotificationPage.isNotificationPageDisplayed(),
                    10000,
                    1000,
                    'Notification page not loaded'
                );
            }
        });

        it('should display notification page', async () => {
            // Verify notification page is displayed
            await AssertionHelper.assertElementDisplayed(
                NotificationPage.pageTitle,
                'Notification Title'
            );
        });

        it('should handle empty notifications', async () => {
            // Check if notifications list is empty
            const isEmpty = await NotificationPage.isNotificationListEmpty();
            
            if (isEmpty) {
                console.log('No notifications available for testing');
            } else {
                console.log('Notifications are available');
            }
        });

        it('should interact with notifications', async () => {
            // Check if there are notifications
            const isEmpty = await NotificationPage.isNotificationListEmpty();
            
            if (!isEmpty) {
                // Click first notification
                await NotificationPage.clickNotification(0);
                await browser.pause(2000);

                // Navigate back
                await browser.back();
                await browser.pause(1000);
            }
        });

        it('should refresh notifications', async () => {
            // Refresh notifications
            await NotificationPage.refreshNotifications();

            // Wait for refresh to complete
            await browser.pause(2000);
        });
    });

    describe('Logout Tests', () => {
        it('should logout successfully', async () => {
            // Navigate to home or settings
            try {
                await browser.back();
            } catch (e) {
                // Ignore error
            }

            // Logout
            if (await HomePage.isHomePageDisplayed()) {
                await HomePage.clickLogout();
            } else if (await SettingsPage.isSettingsPageDisplayed()) {
                await SettingsPage.logout();
            }

            // Wait for navigation to login page
            await WaitHelper.waitForCondition(
                async () => await LoginPage.isLoginPageDisplayed(),
                10000,
                1000,
                'Login page not displayed after logout'
            );

            // Verify we're back at login page
            await AssertionHelper.assertElementDisplayed(
                LoginPage.loginButton,
                'Login Button'
            );
        });
    });
});


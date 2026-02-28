# Page Object Model (POM) Implementation Guide

## Overview
This document describes the Page Object Model (POM) implementation for the mobile automation testing framework. The implementation follows Object-Oriented Programming (OOP) principles with proper encapsulation, reusability, and maintainability.

## Architecture

### Directory Structure
```
tests/
├── pageobjects/           # Page Object classes
│   ├── page.js           # Base Page class
│   ├── login.page.js     # Login Page
│   ├── secure.page.js    # Home/Secure Page
│   ├── profile.page.js   # Profile Page
│   ├── settings.page.js  # Settings Page
│   ├── signup.page.js    # Sign Up Page
│   └── notification.page.js # Notification Page
├── helpers/              # Utility classes
│   ├── testData.helper.js     # Test data generation
│   ├── wait.helper.js         # Wait utilities
│   ├── assertion.helper.js    # Assertion utilities
│   └── gesture.helper.js      # Mobile gesture utilities
├── specs/                # Test specifications
│   └── test.e2e.js      # E2E test suite
└── example.test.js      # Example tests
```

## Core Components

### 1. Base Page Class (`page.js`)

The base `Page` class encapsulates all common mobile automation methods that are inherited by all page objects.

**Key Features:**
- Element waiting strategies
- Mobile-specific gestures (swipe, scroll, tap)
- Keyboard management
- Screenshot utilities
- Common element interactions
- Custom element locators (Android UiAutomator2)

**Example Usage:**
```javascript
// All page objects inherit from Page class
class LoginPage extends Page {
    // Inherits all base methods
}
```

### 2. Page Objects

Each page object represents a screen in the mobile application and encapsulates:
- **Selectors**: Element locators using getter methods
- **Actions**: Methods that interact with the page
- **Validations**: Methods to verify page state

#### Login Page (`login.page.js`)

**Selectors:**
- `usernameInput` - Username input field
- `passwordInput` - Password input field
- `loginButton` - Login button
- `forgotPasswordLink` - Forgot password link
- `errorMessage` - Error message element

**Actions:**
```javascript
await LoginPage.login(username, password)
await LoginPage.enterUsername(username)
await LoginPage.enterPassword(password)
await LoginPage.clickForgotPassword()
await LoginPage.togglePasswordVisibility()
```

**Validations:**
```javascript
await LoginPage.isLoginPageDisplayed()
await LoginPage.isLoginButtonEnabled()
await LoginPage.getErrorMessage()
```

#### Home Page (`secure.page.js`)

**Selectors:**
- `welcomeMessage` - Welcome message
- `logoutButton` - Logout button
- `profileIcon` - Profile navigation
- `settingsIcon` - Settings navigation
- `searchBar` - Search input

**Actions:**
```javascript
await HomePage.clickLogout()
await HomePage.navigateToProfile()
await HomePage.navigateToSettings()
await HomePage.search(query)
await HomePage.refreshContent()
await HomePage.scrollDown()
```

#### Profile Page (`profile.page.js`)

**Key Features:**
- View profile information
- Edit profile data
- Change password
- Upload profile picture

**Usage:**
```javascript
await ProfilePage.updateProfile({
    username: 'newUsername',
    email: 'new@email.com',
    phone: '+1234567890',
    bio: 'New bio text'
})
await ProfilePage.saveProfile()
```

#### Settings Page (`settings.page.js`)

**Key Features:**
- Toggle settings (notifications, dark mode)
- Navigate to sub-settings
- View app version
- Logout

**Usage:**
```javascript
await SettingsPage.toggleNotifications(true)
await SettingsPage.toggleDarkMode(true)
await SettingsPage.navigateToPrivacy()
await SettingsPage.getAppVersion()
```

#### Sign Up Page (`signup.page.js`)

**Key Features:**
- Complete sign-up form
- Accept terms and conditions
- Form validation
- Password visibility toggle

**Usage:**
```javascript
await SignUpPage.signUp({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    username: 'johndoe',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!'
}, true)
```

#### Notification Page (`notification.page.js`)

**Key Features:**
- View notifications
- Click on specific notification
- Delete notifications
- Mark as read
- Swipe to delete

**Usage:**
```javascript
await NotificationPage.clickNotification(0)
await NotificationPage.deleteNotification(1)
await NotificationPage.markAllAsRead()
await NotificationPage.swipeToDeleteNotification(0)
```

### 3. Helper Classes

#### Test Data Helper (`testData.helper.js`)

Generates random test data to avoid hardcoding values.

**Features:**
```javascript
// Generate random email
const email = TestDataHelper.generateRandomEmail()

// Generate strong password
const password = TestDataHelper.generateStrongPassword(16)

// Generate complete user data
const userData = TestDataHelper.generateUserData()

// Get predefined credentials
const creds = TestDataHelper.getValidCredentials()
```

#### Wait Helper (`wait.helper.js`)

Provides advanced waiting strategies.

**Features:**
```javascript
// Wait for custom condition
await WaitHelper.waitForCondition(
    async () => await element.isDisplayed(),
    10000,
    500,
    'Element not displayed'
)

// Retry action with exponential backoff
await WaitHelper.retryWithBackoff(
    async () => await LoginPage.clickLogin(),
    5,
    1000
)

// Smart wait with multiple conditions
await WaitHelper.smartWait(element, {
    timeout: 10000,
    clickable: true,
    enabled: true,
    text: 'expected text'
})
```

#### Assertion Helper (`assertion.helper.js`)

Provides reusable assertion methods.

**Features:**
```javascript
// Assert element is displayed
await AssertionHelper.assertElementDisplayed(element, 'Element Name')

// Assert text matches
await AssertionHelper.assertTextEquals(element, 'expected', 'Element Name')

// Assert text contains
await AssertionHelper.assertContains(actualText, 'substring', 'Message')

// Soft assertions (continue on failure)
const errors = []
await AssertionHelper.softAssert(
    async () => await AssertionHelper.assertEqual(1, 2, 'Test'),
    errors
)
AssertionHelper.verifyAll(errors)
```

#### Gesture Helper (`gesture.helper.js`)

Mobile-specific gesture utilities.

**Features:**
```javascript
// Basic gestures
await GestureHelper.swipeLeft()
await GestureHelper.swipeRight()
await GestureHelper.swipeUp()
await GestureHelper.swipeDown()

// Advanced gestures
await GestureHelper.longPress(element, 2000)
await GestureHelper.doubleTap(element)
await GestureHelper.pinchZoomIn(element)
await GestureHelper.pullToRefresh()

// Scroll to element
await GestureHelper.scrollToText('Search Text')
```

## OOP Principles Implementation

### 1. Encapsulation
- **Private Implementation**: Element locators and internal logic are encapsulated within page objects
- **Public Interface**: Only expose necessary methods for test interaction
- **Getter Methods**: Use getters for lazy evaluation of element locators

```javascript
class LoginPage extends Page {
    // Encapsulated locator (getter)
    get usernameInput() {
        return this.findByResourceId('com.yourapp:id/username');
    }

    // Public method exposing functionality
    async enterUsername(username) {
        await this.setInputValue(this.usernameInput, username);
    }
}
```

### 2. Inheritance
- All page objects extend the base `Page` class
- Inherit common mobile automation methods
- Override when custom behavior is needed

```javascript
class LoginPage extends Page {
    // Inherits all methods from Page class
    // Can override if custom behavior is needed
}
```

### 3. Abstraction
- Hide complex implementation details
- Provide simple, intuitive interfaces
- Actions are abstracted into meaningful methods

```javascript
// Complex implementation hidden
async login(username, password, rememberMe = false) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    if (rememberMe) {
        await this.clickElement(this.rememberMeCheckbox);
    }
    await this.clickLogin();
}

// Simple usage in tests
await LoginPage.login('user', 'pass', true)
```

### 4. Single Responsibility Principle
- Each page object handles one screen/page
- Each helper class has a specific purpose
- Methods have single, clear responsibilities

### 5. DRY (Don't Repeat Yourself)
- Common actions in base `Page` class
- Reusable helpers for test data, waits, assertions
- No duplication of locators or actions

## Best Practices

### 1. Element Locators
```javascript
// ✅ Good - Using resource IDs (most stable)
get loginButton() {
    return this.findByResourceId('com.yourapp:id/login_button');
}

// ✅ Good - Using text (for labels)
get forgotPasswordLink() {
    return this.findByText('Forgot Password?');
}

// ⚠️ Acceptable - XPath (when necessary)
get complexElement() {
    return $('//android.widget.Button[@text="Login"]');
}
```

### 2. Method Naming
```javascript
// ✅ Good - Clear, descriptive names
async enterUsername(username) { }
async clickLoginButton() { }
async isLoginPageDisplayed() { }

// ❌ Bad - Vague names
async doStuff() { }
async click() { }
async check() { }
```

### 3. Page Object Usage in Tests
```javascript
// ✅ Good - Clear, readable test
it('should login successfully', async () => {
    await LoginPage.login('user', 'pass');
    await AssertionHelper.assertElementDisplayed(
        HomePage.welcomeMessage,
        'Welcome Message'
    );
});

// ❌ Bad - Direct element interaction
it('should login successfully', async () => {
    await $('id=username').setValue('user');
    await $('id=password').setValue('pass');
    await $('id=login').click();
});
```

### 4. Wait Strategies
```javascript
// ✅ Good - Use appropriate waits
await WaitHelper.waitForCondition(
    async () => await element.isDisplayed(),
    10000
);

// ❌ Bad - Hard waits
await browser.pause(5000);
```

### 5. Test Data
```javascript
// ✅ Good - Generate dynamic data
const userData = TestDataHelper.generateUserData();

// ❌ Bad - Hardcoded data
const username = 'testuser123';
```

## Running Tests

```bash
# Run all tests
npm run wdio

# Run specific test file
npm run wdio -- --spec=tests/specs/test.e2e.js

# Run example tests
npm run wdio -- --spec=tests/example.test.js
```

## Customization Guide

### Adding a New Page Object

1. **Create new page file** in `tests/pageobjects/`
2. **Extend base Page class**
3. **Define selectors as getters**
4. **Add action methods**
5. **Add validation methods**
6. **Export as singleton**

Example:
```javascript
const Page = require('./page');

class NewPage extends Page {
    // Selectors
    get elementName() {
        return this.findByResourceId('com.yourapp:id/element');
    }

    // Actions
    async performAction() {
        await this.clickElement(this.elementName);
    }

    // Validations
    async isPageDisplayed() {
        return await this.isElementDisplayed(this.elementName);
    }
}

module.exports = new NewPage();
```

### Updating Element Locators

Update resource IDs in page objects to match your app:

```javascript
// Change from:
get loginButton() {
    return this.findByResourceId('com.yourapp:id/login_button');
}

// To match your app:
get loginButton() {
    return this.findByResourceId('com.myactualapp:id/btn_login');
}
```

## Troubleshooting

### Element Not Found
- Verify resource ID matches your app
- Check if element requires scrolling
- Use `driver.getPageSource()` to inspect current screen

### Timing Issues
- Use appropriate wait strategies from `WaitHelper`
- Increase timeout values if needed
- Add explicit waits for specific conditions

### Gesture Not Working
- Verify device screen dimensions
- Adjust swipe/scroll distances
- Check if gestures are device-specific

## Benefits of This POM Implementation

1. **Maintainability**: Changes to UI only require updates in one place
2. **Reusability**: Common methods inherited from base class
3. **Readability**: Tests read like English sentences
4. **Scalability**: Easy to add new pages and functionality
5. **Testability**: Each component can be tested independently
6. **Consistency**: Standardized approach across all tests
7. **Efficiency**: Helper classes eliminate code duplication

## Additional Resources

- [WebdriverIO Documentation](https://webdriver.io/)
- [Appium Documentation](http://appium.io/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Mobile Testing Best Practices](https://appium.io/docs/en/about-appium/intro/)

---

**Note**: Update the resource IDs in all page objects to match your actual Android application's element identifiers.

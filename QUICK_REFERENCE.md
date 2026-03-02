# Page Object Model - Quick Reference

## 🎯 Common Operations

### Login Operations
```javascript
const LoginPage = require('./pageobjects/login.page')

// Simple login
await LoginPage.login('username', 'password')

// Login with remember me
await LoginPage.login('username', 'password', true)

// Individual actions
await LoginPage.enterUsername('username')
await LoginPage.enterPassword('password')
await LoginPage.clickLogin()

// Check page state
const isDisplayed = await LoginPage.isLoginPageDisplayed()
const isEnabled = await LoginPage.isLoginButtonEnabled()
const error = await LoginPage.getErrorMessage()
```

### Navigation
```javascript
const HomePage = require('./pageobjects/secure.page')

// Navigate to different sections
await HomePage.navigateToProfile()
await HomePage.navigateToSettings()
await HomePage.openNotifications()
await HomePage.openMenu()
```

### Profile Management
```javascript
const ProfilePage = require('./pageobjects/profile.page')

// Update profile
await ProfilePage.updateProfile({
    username: 'newUsername',
    email: 'new@email.com',
    phone: '+1234567890',
    bio: 'New bio text'
})
await ProfilePage.saveProfile()

// Get profile info
const username = await ProfilePage.getUsername()
const email = await ProfilePage.getEmail()
```

### Settings Management
```javascript
const SettingsPage = require('./pageobjects/settings.page')

// Toggle settings
await SettingsPage.toggleNotifications(true)
await SettingsPage.toggleDarkMode(false)

// Navigate
await SettingsPage.navigateToPrivacy()
await SettingsPage.navigateToSecurity()

// Get info
const version = await SettingsPage.getAppVersion()
```

### Sign Up
```javascript
const SignUpPage = require('./pageobjects/signup.page')

// Complete sign up
await SignUpPage.signUp({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    username: 'johndoe',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!'
}, true)
```

### Notifications
```javascript
const NotificationPage = require('./pageobjects/notification.page')

// Interact with notifications
await NotificationPage.clickNotification(0)
await NotificationPage.deleteNotification(1)
await NotificationPage.markAllAsRead()
await NotificationPage.clearAllNotifications()

// Swipe to delete
await NotificationPage.swipeToDeleteNotification(0)
```

## 🔧 Helper Utilities

### Test Data Helper
```javascript
const TestDataHelper = require('./helpers/testData.helper')

// Generate random data
const email = TestDataHelper.generateRandomEmail()
const phone = TestDataHelper.generateRandomPhoneNumber()
const username = TestDataHelper.generateRandomUsername()
const password = TestDataHelper.generateStrongPassword(16)
const fullName = TestDataHelper.generateRandomFullName()

// Generate complete user data
const userData = TestDataHelper.generateUserData()
// Returns: { fullName, username, email, phone, password, confirmPassword }

// Get predefined credentials
const validCreds = TestDataHelper.getValidCredentials()
const invalidCreds = TestDataHelper.getInvalidCredentials()

// Generate profile data
const profileData = TestDataHelper.getTestProfileData()

// Other utilities
const randomInt = TestDataHelper.generateRandomInt(1, 100)
const pastDate = TestDataHelper.generatePastDate(30)
```

### Wait Helper
```javascript
const WaitHelper = require('./helpers/wait.helper')

// Wait for condition
await WaitHelper.waitForCondition(
    async () => await element.isDisplayed(),
    10000,  // timeout
    500,    // polling interval
    'Element not displayed'
)

// Wait for element states
await WaitHelper.waitForClickable(element, 10000)
await WaitHelper.waitForEnabled(element, 10000)
await WaitHelper.waitForDisappear(element, 10000)

// Wait for text
await WaitHelper.waitForText(element, 'expected text', 10000)

// Wait for element count
await WaitHelper.waitForElementCount('selector', 5, 10000)

// Retry action
await WaitHelper.retryAction(
    async () => await performAction(),
    3,      // max retries
    1000    // delay between retries
)

// Retry with exponential backoff
await WaitHelper.retryWithBackoff(
    async () => await performAction(),
    5,      // max retries
    1000    // base delay
)

// Smart wait (combines multiple strategies)
await WaitHelper.smartWait(element, {
    timeout: 10000,
    clickable: true,
    enabled: true,
    text: 'expected text'
})
```

### Assertion Helper
```javascript
const AssertionHelper = require('./helpers/assertion.helper')

// Element assertions
await AssertionHelper.assertElementDisplayed(element, 'Element Name')
await AssertionHelper.assertElementNotDisplayed(element, 'Element Name')
await AssertionHelper.assertElementEnabled(element, 'Button')
await AssertionHelper.assertElementDisabled(element, 'Button')
await AssertionHelper.assertElementExists(element, 'Element')

// Text assertions
await AssertionHelper.assertTextEquals(element, 'expected text', 'Element')
await AssertionHelper.assertTextContains(element, 'substring', 'Element')

// Attribute assertions
await AssertionHelper.assertAttributeEquals(element, 'attr', 'value', 'Element')

// Value assertions
await AssertionHelper.assertEqual(actual, expected, 'Message')
await AssertionHelper.assertContains(actualString, substring, 'Message')
await AssertionHelper.assertTrue(condition, 'Message')
await AssertionHelper.assertFalse(condition, 'Message')
await AssertionHelper.assertNull(value, 'Message')
await AssertionHelper.assertNotNull(value, 'Message')

// Element count
await AssertionHelper.assertElementCount('selector', 5)

// URL assertion
await AssertionHelper.assertUrlContains('expected-url-part')

// Soft assertions (continue on failure)
const errors = []
await AssertionHelper.softAssert(
    async () => await AssertionHelper.assertEqual(1, 2, 'Test'),
    errors
)
await AssertionHelper.softAssert(
    async () => await AssertionHelper.assertTrue(false, 'Another test'),
    errors
)
// Verify all at the end
AssertionHelper.verifyAll(errors)  // Throws if any failed
```

### Gesture Helper
```javascript
const GestureHelper = require('./helpers/gesture.helper')

// Basic swipes
await GestureHelper.swipeLeft()
await GestureHelper.swipeRight()
await GestureHelper.swipeUp()
await GestureHelper.swipeDown()

// Swipe with custom distance
await GestureHelper.swipeLeft(0.8)  // 80% of screen width

// Swipe on specific element
await GestureHelper.swipeOnElement(element, 'left', 0.5)

// Tap gestures
await GestureHelper.tap(element)
await GestureHelper.doubleTap(element)
await GestureHelper.longPress(element, 2000)
await GestureHelper.tapByCoordinates(100, 200)
await GestureHelper.multiFingerTap(element, 2)

// Scroll operations
await GestureHelper.scrollToText('Search for this text')
await GestureHelper.scrollToPartialText('Partial text')

// Zoom gestures
await GestureHelper.pinchZoomIn(element)
await GestureHelper.pinchZoomOut(element)

// Other gestures
await GestureHelper.dragAndDrop(sourceElement, targetElement)
await GestureHelper.pullToRefresh()
```

## 🎨 Base Page Methods

All page objects inherit these methods from the base `Page` class:

```javascript
// Element interaction
await page.clickElement(element, timeout)
await page.setInputValue(element, value, timeout)
await page.getElementText(element, timeout)
await page.getElementAttribute(element, 'attributeName')

// Element state checks
await page.isElementDisplayed(element)
await page.isElementEnabled(element)

// Waits
await page.waitForElement(element, timeout)
await page.waitForElementExist(element, timeout)

// Mobile-specific
await page.swipe(direction, distance)
await page.hideKeyboard()
await page.scrollToElement(element)
await page.longPress(element, duration)
await page.tapByCoordinates(x, y)

// Utilities
await page.takeScreenshot('filename')
await page.pause(milliseconds)

// Element finders (Android)
page.findByText('exact text')
page.findByPartialText('partial text')
page.findByContentDesc('content description')
page.findByResourceId('com.app:id/element')
```

## 📝 Test Structure Template

```javascript
const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const HomePage = require('../pageobjects/secure.page')
const TestDataHelper = require('../helpers/testData.helper')
const WaitHelper = require('../helpers/wait.helper')
const AssertionHelper = require('../helpers/assertion.helper')

describe('Feature Name', () => {
    
    before(async () => {
        // Setup before all tests
    })

    beforeEach(async () => {
        // Setup before each test
    })

    describe('Sub-feature', () => {
        it('should perform action successfully', async () => {
            // Arrange
            const testData = TestDataHelper.generateUserData()
            
            // Act
            await LoginPage.login(testData.username, testData.password)
            await WaitHelper.waitForCondition(
                async () => await HomePage.isHomePageDisplayed(),
                10000
            )
            
            // Assert
            await AssertionHelper.assertElementDisplayed(
                HomePage.welcomeMessage,
                'Welcome Message'
            )
        })
    })

    afterEach(async () => {
        // Cleanup after each test
    })

    after(async () => {
        // Cleanup after all tests
    })
})
```

## 🔍 Element Locator Strategies

```javascript
// By Resource ID (Most Stable - Recommended)
this.findByResourceId('com.yourapp:id/element_id')

// By Text (Good for labels, buttons)
this.findByText('Exact Text')
this.findByPartialText('Partial')

// By Content Description (Accessibility ID)
this.findByContentDesc('content_description')

// By XPath (Use sparingly)
$('//android.widget.Button[@text="Login"]')

// By Class Name
$('android.widget.EditText')

// By UiAutomator (Android specific)
$('android=new UiSelector().text("Text")')
$('android=new UiSelector().className("android.widget.Button").instance(0)')
```

## ⚡ Performance Tips

```javascript
// ✅ Good - Parallel operations when possible
const [username, email] = await Promise.all([
    ProfilePage.getUsername(),
    ProfilePage.getEmail()
])

// ✅ Good - Smart waits
await WaitHelper.waitForCondition(condition, timeout)

// ❌ Bad - Hard waits
await browser.pause(5000)

// ✅ Good - Reuse page objects
const page = LoginPage

// ✅ Good - Generate dynamic data
const data = TestDataHelper.generateUserData()

// ❌ Bad - Hardcoded data
const username = 'hardcoded_user'
```

## 🐛 Common Issues & Solutions

```javascript
// Issue: Element not found
// Solution: Wait for element
await page.waitForElement(element, 15000)

// Issue: Stale element
// Solution: Re-find element
const button = page.loginButton  // Fresh reference

// Issue: Element not clickable
// Solution: Scroll to element first
await page.scrollToElement(element)
await page.clickElement(element)

// Issue: Keyboard blocking element
// Solution: Hide keyboard
await page.hideKeyboard()
await page.clickElement(element)

// Issue: Need to verify element doesn't exist
// Solution: Use try-catch or negative assertion
await AssertionHelper.assertElementNotDisplayed(element, 'Name')
```

## 📱 Device/Platform Specific

```javascript
// Get platform
const platform = await driver.capabilities.platformName

// Conditional logic
if (platform === 'Android') {
    // Android-specific code
} else if (platform === 'iOS') {
    // iOS-specific code
}

// Get device screen size
const { width, height } = await driver.getWindowRect()
```

---

**Quick Tip**: Always use page objects and helpers - never interact with elements directly in tests!
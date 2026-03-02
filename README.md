# Mobile Framework Automation Testing

A comprehensive mobile automation testing framework using WebdriverIO and Appium with a robust Page Object Model (POM) implementation following OOP principles.

## 🚀 Features

- **Page Object Model (POM)**: Clean separation of test logic and page structure
- **OOP Principles**: Inheritance, encapsulation, abstraction, and single responsibility
- **Reusable Components**: Base classes and helper utilities to avoid code duplication
- **Mobile-Specific Actions**: Swipe, scroll, tap, long press, and other gestures
- **Smart Wait Strategies**: Multiple wait helpers with retry and backoff mechanisms
- **Test Data Generation**: Dynamic test data creation to avoid hardcoding
- **Comprehensive Assertions**: Soft and hard assertions with detailed error messages
- **Cross-Platform Ready**: Structured for easy Android/iOS support

## 📁 Project Structure

```
.
├── app/
│   └── myapp.apk                 # Android application
├── tests/
│   ├── pageobjects/              # Page Object classes
│   │   ├── page.js              # Base Page class (parent)
│   │   ├── login.page.js        # Login screen
│   │   ├── secure.page.js       # Home/secure screen
│   │   ├── profile.page.js      # Profile screen
│   │   ├── settings.page.js     # Settings screen
│   │   ├── signup.page.js       # Sign-up screen
│   │   └── notification.page.js # Notification screen
│   ├── helpers/                  # Utility classes
│   │   ├── testData.helper.js   # Test data generation
│   │   ├── wait.helper.js       # Wait strategies
│   │   ├── assertion.helper.js  # Assertion utilities
│   │   └── gesture.helper.js    # Mobile gestures
│   ├── specs/
│   │   └── test.e2e.js          # E2E test suite
│   └── example.test.js           # Example tests
├── package.json
├── wdio.conf.js                  # WebdriverIO configuration
├── POM_IMPLEMENTATION_GUIDE.md   # Detailed POM documentation
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Node.js (v14 or higher)
- Android SDK / Android Emulator
- Appium Server (v2.0+)
- Java JDK (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Devops-A-01-Mobile-framework-automation-testing-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Appium server**
   ```bash
   appium
   ```
   Or install Appium 2.0:
   ```bash
   npm install -g appium
   appium driver install uiautomator2
   appium
   ```

4. **Configure capabilities** in `wdio.conf.js`
   - Update `appium:deviceName`
   - Update `appium:platformVersion`
   - Update `appium:app` path if needed

## 🏃 Running Tests

```bash
# Run all tests
npm run wdio

# Run specific test suite
npm run wdio -- --spec=tests/specs/test.e2e.js

# Run example tests
npm run wdio -- --spec=tests/example.test.js
```

## 📖 Page Object Model (POM) Usage

### Basic Example

```javascript
const LoginPage = require('./pageobjects/login.page')
const HomePage = require('./pageobjects/secure.page')
const TestDataHelper = require('./helpers/testData.helper')

describe('Login Test', () => {
    it('should login successfully', async () => {
        // Generate test data
        const credentials = TestDataHelper.getValidCredentials()
        
        // Use page object methods
        await LoginPage.login(credentials.username, credentials.password)
        
        // Verify result
        await expect(HomePage.welcomeMessage).toBeDisplayed()
    })
})
```

### Available Page Objects

| Page Object | Description | Key Methods |
|------------|-------------|-------------|
| `LoginPage` | Login screen | `login()`, `enterUsername()`, `enterPassword()` |
| `HomePage` | Main screen | `navigateToProfile()`, `search()`, `scrollDown()` |
| `ProfilePage` | Profile screen | `updateProfile()`, `saveProfile()`, `getUsername()` |
| `SettingsPage` | Settings screen | `toggleNotifications()`, `navigateToPrivacy()` |
| `SignUpPage` | Registration | `signUp()`, `enterEmail()`, `acceptTerms()` |
| `NotificationPage` | Notifications | `clickNotification()`, `markAllAsRead()` |

### Using Helper Classes

```javascript
// Test Data Helper
const userData = TestDataHelper.generateUserData()
const email = TestDataHelper.generateRandomEmail()

// Wait Helper
await WaitHelper.waitForCondition(async () => await element.isDisplayed(), 10000)
await WaitHelper.retryAction(async () => await action(), 3, 1000)

// Assertion Helper
await AssertionHelper.assertElementDisplayed(element, 'Element Name')
await AssertionHelper.assertTextContains(element, 'expected text', 'Message')

// Gesture Helper
await GestureHelper.swipeLeft()
await GestureHelper.scrollToText('Search Text')
await GestureHelper.longPress(element, 2000)
```

## 🎯 OOP Principles

### 1. Encapsulation
- Page elements are private (accessed via getters)
- Implementation details hidden from tests
- Public methods provide clean interface

### 2. Inheritance
- All page objects extend base `Page` class
- Common functionality inherited from parent
- Code reuse across all pages

### 3. Abstraction
- Complex operations abstracted into simple methods
- Tests don't need to know implementation details
- Focus on "what" not "how"

### 4. Single Responsibility
- Each page object handles one screen
- Each helper has one specific purpose
- Methods do one thing well

## 🔧 Customization

### Adding a New Page Object

1. Create file: `tests/pageobjects/mypage.page.js`
2. Extend base class:
   ```javascript
   const Page = require('./page')
   
   class MyPage extends Page {
       get myElement() {
           return this.findByResourceId('com.app:id/element')
       }
       
       async performAction() {
           await this.clickElement(this.myElement)
       }
   }
   
   module.exports = new MyPage()
   ```

### Updating Element Locators

Replace `com.yourapp:id/*` with your actual app's resource IDs:

```javascript
// Find your app's resource IDs using:
// adb shell uiautomator dump
// adb pull /sdcard/window_dump.xml
```

## 📚 Documentation

- **[POM Implementation Guide](./POM_IMPLEMENTATION_GUIDE.md)** - Comprehensive guide
- **[WebdriverIO Docs](https://webdriver.io/)** - WebdriverIO documentation
- **[Appium Docs](http://appium.io/)** - Appium documentation

## 🧪 Test Examples

The project includes:
- **E2E Tests** (`tests/specs/test.e2e.js`) - Complete user flows
- **Example Tests** (`tests/example.test.js`) - Usage demonstrations

## 🎨 Code Quality

- **No Code Duplication**: Common code in base classes and helpers
- **Standardized Naming**: Consistent method and variable names
- **Well Documented**: Comprehensive JSDoc comments
- **Maintainable**: Easy to update and extend
- **Readable**: Tests read like plain English

## 🐛 Troubleshooting

### Element Not Found
- Verify resource IDs match your app
- Use `driver.getPageSource()` to inspect elements
- Check if element requires scrolling

### Appium Connection Issues
- Ensure Appium server is running on port 4723
- Check device/emulator is connected: `adb devices`
- Verify `wdio.conf.js` capabilities match your setup

### Timing Issues
- Increase timeout values in `wdio.conf.js`
- Use appropriate wait strategies from `WaitHelper`
- Add explicit waits for dynamic content

## 📝 Best Practices

1. ✅ Use page objects for all UI interactions
2. ✅ Generate test data dynamically
3. ✅ Use appropriate wait strategies
4. ✅ Add meaningful assertions with error messages
5. ✅ Keep tests focused and independent
6. ✅ Follow naming conventions
7. ✅ Document complex logic
8. ✅ Update locators when UI changes

## 🤝 Contributing

When adding new features:
1. Follow existing POM structure
2. Add JSDoc comments
3. Update documentation
4. Ensure OOP principles are maintained
5. Add example usage in tests

## 📄 License

This project is for educational and testing purposes.

## 👥 Support

For questions or issues:
- Check the [POM Implementation Guide](./POM_IMPLEMENTATION_GUIDE.md)
- Review example tests
- Check WebdriverIO and Appium documentation

---

**Built with:** WebdriverIO + Appium + Page Object Model + OOP Principles

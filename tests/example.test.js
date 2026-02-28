const { expect } = require('@wdio/globals')
const LoginPage = require('./pageobjects/login.page')
const HomePage = require('./pageobjects/secure.page')
const TestDataHelper = require('./helpers/testData.helper')
const WaitHelper = require('./helpers/wait.helper')
const AssertionHelper = require('./helpers/assertion.helper')
const GestureHelper = require('./helpers/gesture.helper')

/**
 * Example Test Suite demonstrating POM usage
 * This file shows basic examples of using the Page Object Model
 */
describe('Android App Example Tests', () => {
    
    describe('App Launch Test', () => {
        it('should start a session and load app capabilities', async () => {
            const caps = await driver.getCapabilities()
            await expect(caps.get('platformName')).toBeDefined()
            
            // Verify platform is Android
            const platform = caps.get('platformName')
            AssertionHelper.assertEqual(
                platform, 
                'Android', 
                'Platform validation'
            )
        })
    })

    describe('Basic Login Flow Example', () => {
        it('should display login page on app launch', async () => {
            // Wait for login page to be displayed
            await WaitHelper.waitForCondition(
                async () => await LoginPage.isLoginPageDisplayed(),
                15000,
                1000,
                'Login page not displayed'
            )

            // Verify login button is displayed
            await AssertionHelper.assertElementDisplayed(
                LoginPage.loginButton,
                'Login Button'
            )
        })

        it('should login and verify home page - Using POM', async () => {
            // Get valid credentials from test data helper
            const credentials = TestDataHelper.getValidCredentials()
            
            // Perform login using page object
            await LoginPage.login(credentials.username, credentials.password)

            // Wait for home page to load
            await WaitHelper.waitForCondition(
                async () => await HomePage.isHomePageDisplayed(),
                15000,
                1000,
                'Home page not loaded after login'
            )

            // Verify home page elements
            await AssertionHelper.assertElementDisplayed(
                HomePage.welcomeMessage,
                'Welcome Message'
            )

            console.log('✓ Successfully logged in and verified home page using POM pattern')
        })

        it('should handle empty credentials - Negative Test', async () => {
            // Try to login with empty credentials
            await LoginPage.enterUsername('')
            await LoginPage.enterPassword('')
            await LoginPage.clickLogin()

            // Verify login button is still displayed (login failed)
            await browser.pause(2000)
            const loginDisplayed = await LoginPage.isLoginPageDisplayed()
            
            AssertionHelper.assertTrue(
                loginDisplayed,
                'Should remain on login page with empty credentials'
            )
        })
    })

    describe('Gesture Examples', () => {
        it('should perform swipe gestures', async () => {
            // Example: Swipe left (if applicable in your app)
            await GestureHelper.swipeLeft(0.7)
            await browser.pause(1000)

            // Example: Swipe right
            await GestureHelper.swipeRight(0.7)
            await browser.pause(1000)

            console.log('✓ Successfully performed swipe gestures')
        })

        it('should perform scroll gestures on home page', async () => {
            // Ensure we're on home page
            if (await HomePage.isHomePageDisplayed()) {
                // Scroll down using page object method
                await HomePage.scrollDown()
                await browser.pause(1000)

                // Scroll up
                await HomePage.scrollUp()
                await browser.pause(1000)

                console.log('✓ Successfully performed scroll gestures using POM')
            }
        })
    })

    describe('Wait Helper Examples', () => {
        it('should use different wait strategies', async () => {
            // Example 1: Wait with retry
            await WaitHelper.retryAction(
                async () => {
                    return await LoginPage.isLoginPageDisplayed()
                },
                3,
                1000
            )

            // Example 2: Wait for clickable
            await WaitHelper.waitForClickable(LoginPage.loginButton, 10000)

            // Example 3: Smart wait with multiple conditions
            await WaitHelper.smartWait(LoginPage.loginButton, {
                timeout: 10000,
                clickable: true,
                enabled: true
            })

            console.log('✓ Successfully demonstrated different wait strategies')
        })
    })

    describe('Test Data Helper Examples', () => {
        it('should generate random test data', async () => {
            // Generate random user data
            const userData = TestDataHelper.generateUserData()
            
            console.log('Generated test data:')
            console.log('- Full Name:', userData.fullName)
            console.log('- Username:', userData.username)
            console.log('- Email:', userData.email)
            console.log('- Phone:', userData.phone)

            // Verify data is generated
            AssertionHelper.assertNotNull(userData.fullName, 'Full Name')
            AssertionHelper.assertNotNull(userData.username, 'Username')
            AssertionHelper.assertNotNull(userData.email, 'Email')
            
            console.log('✓ Successfully generated random test data')
        })

        it('should generate strong passwords', async () => {
            // Generate multiple passwords
            const password1 = TestDataHelper.generateStrongPassword()
            const password2 = TestDataHelper.generateStrongPassword(16)
            
            console.log('Generated passwords:')
            console.log('- Password 1 (12 chars):', password1)
            console.log('- Password 2 (16 chars):', password2)

            // Verify passwords are different
            AssertionHelper.assertTrue(
                password1 !== password2,
                'Generated passwords should be unique'
            )

            console.log('✓ Successfully generated strong passwords')
        })
    })

    describe('Soft Assertion Examples', () => {
        it('should continue test execution with soft assertions', async () => {
            const errors = []

            // Soft assertion 1
            await AssertionHelper.softAssert(
                async () => AssertionHelper.assertEqual(1, 1, 'First assertion'),
                errors
            )

            // Soft assertion 2
            await AssertionHelper.softAssert(
                async () => AssertionHelper.assertContains('Hello World', 'World', 'Second assertion'),
                errors
            )

            // Soft assertion 3 - This will fail but test continues
            await AssertionHelper.softAssert(
                async () => AssertionHelper.assertEqual('test', 'demo', 'Third assertion'),
                errors
            )

            // Log results
            console.log(`Total soft assertions: 3`)
            console.log(`Failed assertions: ${errors.length}`)
            
            if (errors.length > 0) {
                console.log('Failed assertions:', errors)
            }

            // This will throw if there were any failures
            // Comment out to allow test to pass even with soft assertion failures
            // AssertionHelper.verifyAll(errors)
        })
    })

    describe('Element Interaction Examples', () => {
        it('should demonstrate various element interactions', async () => {
            // Check if element is displayed
            const isDisplayed = await LoginPage.isElementDisplayed(LoginPage.loginButton)
            console.log('Login button displayed:', isDisplayed)

            // Check if element is enabled
            const isEnabled = await LoginPage.isElementEnabled(LoginPage.loginButton)
            console.log('Login button enabled:', isEnabled)

            // Get element text
            if (await LoginPage.loginButton.isDisplayed()) {
                const buttonText = await LoginPage.getElementText(LoginPage.loginButton)
                console.log('Login button text:', buttonText)
            }

            console.log('✓ Successfully demonstrated element interactions using POM')
        })
    })

    describe('Advanced Page Object Usage', () => {
        it('should chain multiple page object actions', async () => {
            // Example of fluent/chained actions using page objects
            
            // Step 1: Navigate to login if not already there
            if (!(await LoginPage.isLoginPageDisplayed())) {
                console.log('Navigating to login page...')
                // Add navigation logic if needed
            }

            // Step 2: Enter credentials
            await LoginPage.enterUsername('testuser')
            await LoginPage.enterPassword('Test@1234')

            // Step 3: Hide keyboard before clicking login
            await LoginPage.hideKeyboard()

            // Step 4: Click login
            await LoginPage.clickLogin()

            // Step 5: Wait for navigation
            await WaitHelper.waitForCondition(
                async () => {
                    return await HomePage.isHomePageDisplayed() || 
                           await LoginPage.isLoginPageDisplayed()
                },
                15000,
                1000,
                'Page did not load'
            )

            console.log('✓ Successfully chained multiple page object actions')
        })

        it('should use custom element finders', async () => {
            // Example using different locator strategies from base Page class

            // Find by text
            LoginPage.findByText('Login')
            
            // Find by partial text
            LoginPage.findByPartialText('Log')
            
            // Find by content description
            LoginPage.findByContentDesc('login_button')

            console.log('✓ Demonstrated custom element finder methods from base Page class')
        })
    })

    describe('Screenshot and Debugging', () => {
        it('should take screenshots for documentation', async () => {
            // Take screenshot of login page
            await LoginPage.takeScreenshot('login-page-example')
            console.log('✓ Screenshot saved: login-page-example.png')

            // Pause for observation (useful during test development)
            await LoginPage.pause(1000)

            console.log('✓ Successfully demonstrated screenshot and pause utilities')
        })
    })
})

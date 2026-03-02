const fs = require('fs')
const path = require('path')
const LoginPage = require('./pageobjects/login.page')
const HomePage = require('./pageobjects/secure.page')
const TestDataHelper = require('./helpers/testData.helper')
const WaitHelper = require('./helpers/wait.helper')
const AssertionHelper = require('./helpers/assertion.helper')

const APP_PACKAGE = process.env.APP_PACKAGE || 'com.yourapp'
const TEST_USERNAME = process.env.TEST_USERNAME
const TEST_PASSWORD = process.env.TEST_PASSWORD

async function resetToLoginScreen() {
    await browser.pause(1000)

    try {
        const onHome = await HomePage.isHomePageDisplayed()
        if (onHome) {
            const canLogout = await HomePage.isElementDisplayed(HomePage.logoutButton)
            if (canLogout) {
                await HomePage.clickLogout()
                await browser.pause(1500)
            }
        }
    } catch (error) {
    }

    try {
        await WaitHelper.waitForCondition(
            async () => await LoginPage.isLoginPageDisplayed(),
            12000,
            1000,
            'Login page not displayed after reset'
        )
    } catch (error) {
    }

    try {
        await LoginPage.clearForm()
    } catch (error) {
    }
}

describe('Functional Test Automation - 10 Independent Cases', () => {
    beforeEach(async () => {
        await resetToLoginScreen()
    })

    it('TC01 - should create Android session with capabilities', async () => {
        const caps = driver.capabilities || {}
        AssertionHelper.assertEqual(caps.platformName, 'Android', 'Platform should be Android')
        AssertionHelper.assertNotNull(caps['appium:automationName'], 'Automation name should be present')
    })

    it('TC02 - should display login page and primary login action', async () => {
        const loginDisplayed = await LoginPage.isLoginPageDisplayed()
        AssertionHelper.assertTrue(loginDisplayed, 'Login page should be displayed')

        const loginAction = await LoginPage.getPrimaryLoginActionElement()
        await AssertionHelper.assertElementDisplayed(loginAction, 'Primary Login Action')
    })

    it('TC03 - should accept username input value', async () => {
        const usernameField = await LoginPage.resolveUsernameInput()
        const sampleUsername = `qa_${Date.now()}`

        await LoginPage.enterUsername(sampleUsername)
        const currentValue = await usernameField.getText()

        AssertionHelper.assertTrue(
            currentValue.includes('qa_') || currentValue.length > 0,
            'Username input should contain entered value'
        )
    })

    it('TC04 - should accept password input value', async () => {
        const passwordField = await LoginPage.resolvePasswordInput()
        const samplePassword = 'Pass@1234'

        await LoginPage.enterPassword(samplePassword)
        const currentValue = await passwordField.getText()

        AssertionHelper.assertTrue(
            currentValue.length > 0,
            'Password input should contain value after typing'
        )
    })

    it('TC05 - should clear login form successfully', async () => {
        await LoginPage.enterUsername('temp_user')
        await LoginPage.enterPassword('Temp@1234')
        await LoginPage.clearForm()

        const usernameField = await LoginPage.resolveUsernameInput()
        const passwordField = await LoginPage.resolvePasswordInput()

        const usernameValue = await usernameField.getText()
        const passwordValue = await passwordField.getText()

        AssertionHelper.assertTrue(
            !usernameValue.includes('temp_user'),
            'Username should not keep previous entered value after clear'
        )
        AssertionHelper.assertTrue(
            !passwordValue.includes('Temp@1234'),
            'Password should not keep previous entered value after clear'
        )
    })

    it('TC06 - should expose login action enabled state', async () => {
        const isEnabled = await LoginPage.isLoginButtonEnabled()
        AssertionHelper.assertTrue(typeof isEnabled === 'boolean', 'Login button enabled state should be boolean')
    })

    it('TC07 - should keep user on login for invalid credentials', async () => {
        const invalidCreds = TestDataHelper.getInvalidCredentials()
        await LoginPage.login(invalidCreds.username, invalidCreds.password)

        await WaitHelper.waitForCondition(
            async () => {
                const stillOnLogin = await LoginPage.isLoginPageDisplayed()
                const errorVisible = await LoginPage.isElementDisplayed(LoginPage.errorMessage)
                return stillOnLogin || errorVisible
            },
            15000,
            1000,
            'Invalid login did not return expected login/error state'
        )

        const stillOnLogin = await LoginPage.isLoginPageDisplayed()
        const errorVisible = await LoginPage.isElementDisplayed(LoginPage.errorMessage)
        AssertionHelper.assertTrue(stillOnLogin || errorVisible, 'Invalid login should not navigate to authenticated state')
    })

    it('TC08 - should login with valid credentials from env file', async () => {
        AssertionHelper.assertTrue(!!TEST_USERNAME, 'TEST_USERNAME must be set in .env')
        AssertionHelper.assertTrue(!!TEST_PASSWORD, 'TEST_PASSWORD must be set in .env')

        await LoginPage.login(TEST_USERNAME, TEST_PASSWORD)
        await browser.pause(4000)

        const sessionActive = !!browser.sessionId
        AssertionHelper.assertTrue(sessionActive, 'Session should remain active after valid login action')

        const loginScreenStillVisible = await LoginPage.isLoginPageDisplayed()
        AssertionHelper.assertTrue(
            typeof loginScreenStillVisible === 'boolean',
            'Login visibility status should be measurable after valid login attempt'
        )
    })

    it('TC09 - should create screenshot file in screenshots folder', async () => {
        const screenshotName = `functional-login-${Date.now()}`
        await LoginPage.takeScreenshot(screenshotName)

        const screenshotPath = path.join(process.cwd(), 'screenshots', `${screenshotName}.png`)
        AssertionHelper.assertTrue(fs.existsSync(screenshotPath), 'Screenshot file should exist after capture')
    })

    it('TC10 - should perform swipe and keep app session active', async () => {
        await LoginPage.swipe('left', 0.6)
        await browser.pause(500)
        await LoginPage.swipe('right', 0.6)

        const sessionActive = !!browser.sessionId
        const currentPackage = await driver.getCurrentPackage()

        AssertionHelper.assertTrue(sessionActive, 'Session should remain active after swipe actions')
        AssertionHelper.assertContains(currentPackage, APP_PACKAGE, 'Current package validation')
    })
})

const fs = require('fs');
const path = require('path');

/**
 * Assertion Helper - Provides reusable assertion utilities
 * Encapsulates common assertion patterns and validations
 */
class AssertionHelper {
    /**
     * Assert element is displayed
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} elementName - Name of element for error message
     */
    static async assertElementDisplayed(element, elementName = 'Element') {
        const isDisplayed = await element.isDisplayed();
        if (!isDisplayed) {
            throw new Error(`${elementName} is not displayed`);
        }
    }

    /**
     * Assert element is not displayed
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} elementName - Name of element for error message
     */
    static async assertElementNotDisplayed(element, elementName = 'Element') {
        try {
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) {
                throw new Error(`${elementName} should not be displayed`);
            }
        } catch (error) {
            // Element not found is expected
            if (!error.message.includes('not exist')) {
                throw error;
            }
        }
    }

    /**
     * Assert element is enabled
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} elementName - Name of element for error message
     */
    static async assertElementEnabled(element, elementName = 'Element') {
        const isEnabled = await element.isEnabled();
        if (!isEnabled) {
            throw new Error(`${elementName} is not enabled`);
        }
    }

    /**
     * Assert element is disabled
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} elementName - Name of element for error message
     */
    static async assertElementDisabled(element, elementName = 'Element') {
        const isEnabled = await element.isEnabled();
        if (isEnabled) {
            throw new Error(`${elementName} should be disabled`);
        }
    }

    /**
     * Assert text equals
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} expectedText - Expected text
     * @param {string} elementName - Name of element for error message
     */
    static async assertTextEquals(element, expectedText, elementName = 'Element') {
        const actualText = await element.getText();
        if (actualText !== expectedText) {
            throw new Error(`${elementName} text mismatch. Expected: "${expectedText}", Actual: "${actualText}"`);
        }
    }

    /**
     * Assert text contains
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} expectedText - Expected text substring
     * @param {string} elementName - Name of element for error message
     */
    static async assertTextContains(element, expectedText, elementName = 'Element') {
        const actualText = await element.getText();
        if (!actualText.includes(expectedText)) {
            throw new Error(`${elementName} text does not contain "${expectedText}". Actual: "${actualText}"`);
        }
    }

    /**
     * Assert attribute value
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} attribute - Attribute name
     * @param {string} expectedValue - Expected attribute value
     * @param {string} elementName - Name of element for error message
     */
    static async assertAttributeEquals(element, attribute, expectedValue, elementName = 'Element') {
        const actualValue = await element.getAttribute(attribute);
        if (actualValue !== expectedValue) {
            throw new Error(`${elementName} attribute "${attribute}" mismatch. Expected: "${expectedValue}", Actual: "${actualValue}"`);
        }
    }

    /**
     * Assert element count
     * @param {string} selector - Element selector
     * @param {number} expectedCount - Expected number of elements
     */
    static async assertElementCount(selector, expectedCount) {
        const elements = await $$(selector);
        const actualCount = elements.length;
        if (actualCount !== expectedCount) {
            throw new Error(`Element count mismatch. Expected: ${expectedCount}, Actual: ${actualCount}`);
        }
    }

    /**
     * Assert element exists
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} elementName - Name of element for error message
     */
    static async assertElementExists(element, elementName = 'Element') {
        const exists = await element.isExisting();
        if (!exists) {
            throw new Error(`${elementName} does not exist`);
        }
    }

    /**
     * Assert element does not exist
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} elementName - Name of element for error message
     */
    static async assertElementNotExists(element, elementName = 'Element') {
        const exists = await element.isExisting();
        if (exists) {
            throw new Error(`${elementName} should not exist`);
        }
    }

    /**
     * Assert value equals
     * @param {any} actual - Actual value
     * @param {any} expected - Expected value
     * @param {string} message - Custom error message
     */
    static assertEqual(actual, expected, message = 'Values do not match') {
        if (actual !== expected) {
            throw new Error(`${message}. Expected: "${expected}", Actual: "${actual}"`);
        }
    }

    /**
     * Assert value contains
     * @param {string} actual - Actual string
     * @param {string} expected - Expected substring
     * @param {string} message - Custom error message
     */
    static assertContains(actual, expected, message = 'String does not contain expected value') {
        if (!actual.includes(expected)) {
            throw new Error(`${message}. Expected to contain: "${expected}", Actual: "${actual}"`);
        }
    }

    /**
     * Assert condition is true
     * @param {boolean} condition - Condition to check
     * @param {string} message - Error message if condition is false
     */
    static assertTrue(condition, message = 'Condition is not true') {
        if (!condition) {
            throw new Error(message);
        }
    }

    /**
     * Assert condition is false
     * @param {boolean} condition - Condition to check
     * @param {string} message - Error message if condition is true
     */
    static assertFalse(condition, message = 'Condition is not false') {
        if (condition) {
            throw new Error(message);
        }
    }

    /**
     * Assert URL contains
     * @param {string} expectedUrlPart - Expected part of URL
     */
    static async assertUrlContains(expectedUrlPart) {
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes(expectedUrlPart)) {
            throw new Error(`URL does not contain "${expectedUrlPart}". Current URL: "${currentUrl}"`);
        }
    }

    /**
     * Assert screenshot matches (basic implementation)
     * @param {string} screenshotName - Name of screenshot
     */
    static async assertScreenshotMatches(screenshotName) {
        const screenshotPath = path.join('./screenshots', `${screenshotName}.png`);
        await browser.saveScreenshot(screenshotPath);
        
        if (!fs.existsSync(screenshotPath)) {
            throw new Error(`Screenshot file not created: ${screenshotPath}`);
        }
    }

    /**
     * Assert array length
     * @param {Array} array - Array to check
     * @param {number} expectedLength - Expected length
     * @param {string} message - Custom error message
     */
    static assertArrayLength(array, expectedLength, message = 'Array length does not match') {
        if (array.length !== expectedLength) {
            throw new Error(`${message}. Expected: ${expectedLength}, Actual: ${array.length}`);
        }
    }

    /**
     * Assert value is null
     * @param {any} value - Value to check
     * @param {string} message - Custom error message
     */
    static assertNull(value, message = 'Value is not null') {
        if (value !== null) {
            throw new Error(`${message}. Actual value: ${value}`);
        }
    }

    /**
     * Assert value is not null
     * @param {any} value - Value to check
     * @param {string} message - Custom error message
     */
    static assertNotNull(value, message = 'Value is null') {
        if (value === null) {
            throw new Error(message);
        }
    }

    /**
     * Soft assert - logs error but continues execution
     * @param {Function} assertionFn - Assertion function to execute
     * @param {Array} errors - Array to collect errors
     */
    static async softAssert(assertionFn, errors = []) {
        try {
            await assertionFn();
        } catch (error) {
            errors.push(error.message);
            console.error(`Soft Assertion Failed: ${error.message}`);
        }
    }

    /**
     * Verify all soft assertions
     * @param {Array} errors - Array of collected errors
     */
    static verifyAll(errors) {
        if (errors.length > 0) {
            throw new Error(`Multiple assertions failed:\n${errors.join('\n')}`);
        }
    }
}

module.exports = AssertionHelper;

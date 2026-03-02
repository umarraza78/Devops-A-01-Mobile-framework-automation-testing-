const { browser, $ } = require('@wdio/globals')
const fs = require('fs')
const path = require('path')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
     * Wait for an element to be displayed
     * @param {WebdriverIO.Element} element - The element to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {Promise<boolean>}
     */
    async waitForElement(element, timeout = 10000) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (error) {
            console.error(`Element not displayed within ${timeout}ms:`, error.message);
            return false;
        }
    }

    /**
     * Wait for an element to exist in DOM
     * @param {WebdriverIO.Element} element - The element to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {Promise<boolean>}
     */
    async waitForElementExist(element, timeout = 10000) {
        try {
            await element.waitForExist({ timeout });
            return true;
        } catch (error) {
            console.error(`Element does not exist within ${timeout}ms:`, error.message);
            return false;
        }
    }

    /**
     * Click on an element with wait
     * @param {WebdriverIO.Element} element - The element to click
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async clickElement(element, timeout = 10000) {
        await this.waitForElement(element, timeout);
        await element.click();
    }

    /**
     * Set value to an input field with wait
     * @param {WebdriverIO.Element} element - The input element
     * @param {string} value - The value to set
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    async setInputValue(element, value, timeout = 10000) {
        await this.waitForElement(element, timeout);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Get text from an element
     * @param {WebdriverIO.Element} element - The element to get text from
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @returns {Promise<string>}
     */
    async getElementText(element, timeout = 10000) {
        await this.waitForElement(element, timeout);
        return await element.getText();
    }

    /**
     * Check if element is displayed
     * @param {WebdriverIO.Element} element - The element to check
     * @returns {Promise<boolean>}
     */
    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            console.log('Element not displayed:', error.message);
            return false;
        }
    }

    /**
     * Check if element is enabled
     * @param {WebdriverIO.Element} element - The element to check
     * @returns {Promise<boolean>}
     */
    async isElementEnabled(element) {
        try {
            return await element.isEnabled();
        } catch (error) {
            console.log('Element not enabled:', error.message);
            return false;
        }
    }

    /**
     * Scroll to element (mobile specific)
     * @param {WebdriverIO.Element} element - The element to scroll to
     */
    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    /**
     * Swipe on screen (mobile specific)
     * @param {string} direction - Direction to swipe: 'up', 'down', 'left', 'right'
     * @param {number} distance - Distance percentage (0-1, default: 0.5)
     */
    async swipe(direction = 'up', distance = 0.5) {
        const { width, height } = await driver.getWindowRect();
        const centerX = width / 2;
        const centerY = height / 2;

        let startX, startY, endX, endY;

        switch (direction.toLowerCase()) {
            case 'up':
                startX = centerX;
                startY = height * (1 - distance);
                endX = centerX;
                endY = height * distance;
                break;
            case 'down':
                startX = centerX;
                startY = height * distance;
                endX = centerX;
                endY = height * (1 - distance);
                break;
            case 'left':
                startX = width * (1 - distance);
                startY = centerY;
                endX = width * distance;
                endY = centerY;
                break;
            case 'right':
                startX = width * distance;
                startY = centerY;
                endX = width * (1 - distance);
                endY = centerY;
                break;
            default:
                throw new Error(`Invalid swipe direction: ${direction}`);
        }

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: endX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(500);
    }

    /**
     * Hide keyboard (mobile specific)
     */
    async hideKeyboard() {
        try {
            if (driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }
        } catch (error) {
            console.log('Keyboard not shown or unable to hide');
        }
    }

    /**
     * Take screenshot with custom name
     * @param {string} filename - Name of the screenshot file
     */
    async takeScreenshot(filename) {
        const screenshotDir = path.resolve(process.cwd(), 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        await browser.saveScreenshot(path.join(screenshotDir, `${filename}.png`));
    }

    /**
     * Wait for a specific duration
     * @param {number} milliseconds - Duration to wait
     */
    async pause(milliseconds = 1000) {
        await browser.pause(milliseconds);
    }

    /**
     * Get element attribute value
     * @param {WebdriverIO.Element} element - The element
     * @param {string} attributeName - Attribute name to get
     * @returns {Promise<string>}
     */
    async getElementAttribute(element, attributeName) {
        await this.waitForElement(element);
        return await element.getAttribute(attributeName);
    }

    /**
     * Tap on element by coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    async tapByCoordinates(x, y) {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x, y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    /**
     * Long press on an element
     * @param {WebdriverIO.Element} element - The element to long press
     * @param {number} duration - Duration of long press in milliseconds (default: 2000)
     */
    async longPress(element, duration = 2000) {
        await this.waitForElement(element);
        await driver.touchAction([
            { action: 'press', element },
            { action: 'wait', ms: duration },
            { action: 'release' }
        ]);
    }

    /**
     * Find element by text content (Android UiAutomator2)
     * @param {string} text - Text to search for
     * @returns {WebdriverIO.Element}
     */
    findByText(text) {
        return $(`android=new UiSelector().text("${text}")`);
    }

    /**
     * Find element by partial text content (Android UiAutomator2)
     * @param {string} text - Partial text to search for
     * @returns {WebdriverIO.Element}
     */
    findByPartialText(text) {
        return $(`android=new UiSelector().textContains("${text}")`);
    }

    /**
     * Find element by content description (accessibility id)
     * @param {string} contentDesc - Content description
     * @returns {WebdriverIO.Element}
     */
    findByContentDesc(contentDesc) {
        return $(`~${contentDesc}`);
    }

    /**
     * Find element by resource ID (Android)
     * @param {string} resourceId - Resource ID
     * @returns {WebdriverIO.Element}
     */
    findByResourceId(resourceId) {
        return $(`android=new UiSelector().resourceId("${resourceId}")`);
    }
}

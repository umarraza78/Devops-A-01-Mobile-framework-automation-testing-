/**
 * Wait Helper - Provides reusable wait utilities
 * Follows OOP principles and encapsulates common wait strategies
 */
class WaitHelper {
    /**
     * Wait for condition with custom polling
     * @param {Function} condition - Condition function to evaluate
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {number} interval - Polling interval in milliseconds (default: 500)
     * @param {string} timeoutMsg - Custom timeout message
     * @returns {Promise<boolean>}
     */
    static async waitForCondition(condition, timeout = 10000, interval = 500, timeoutMsg = 'Condition not met') {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            try {
                if (await condition()) {
                    return true;
                }
            } catch (error) {
                // Continue polling on error
            }
            await browser.pause(interval);
        }
        
        throw new Error(`${timeoutMsg} within ${timeout}ms`);
    }

    /**
     * Wait for element to be clickable
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForClickable(element, timeout = 10000) {
        await element.waitForClickable({ timeout });
    }

    /**
     * Wait for element to be enabled
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForEnabled(element, timeout = 10000) {
        await element.waitForEnabled({ timeout });
    }

    /**
     * Wait for element to disappear
     * @param {WebdriverIO.Element} element - Element to wait for disappearance
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForDisappear(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout, reverse: true });
    }

    /**
     * Wait for text to appear in element
     * @param {WebdriverIO.Element} element - Element to check
     * @param {string} expectedText - Expected text
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForText(element, expectedText, timeout = 10000) {
        await this.waitForCondition(
            async () => {
                const text = await element.getText();
                return text.includes(expectedText);
            },
            timeout,
            500,
            `Text "${expectedText}" did not appear in element`
        );
    }

    /**
     * Wait for element count
     * @param {string} selector - Element selector
     * @param {number} expectedCount - Expected number of elements
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForElementCount(selector, expectedCount, timeout = 10000) {
        await this.waitForCondition(
            async () => {
                const elements = await $$(selector);
                return elements.length === expectedCount;
            },
            timeout,
            500,
            `Element count did not reach ${expectedCount}`
        );
    }

    /**
     * Wait for page load (mobile specific)
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     */
    static async waitForPageLoad(timeout = 30000) {
        await browser.pause(2000); // Initial pause
        await this.waitForCondition(
            async () => {
                const state = await driver.execute(() => document.readyState);
                return state === 'complete';
            },
            timeout,
            1000,
            'Page did not load completely'
        );
    }

    /**
     * Wait for network idle (custom implementation)
     * @param {number} idleTime - Idle time in milliseconds (default: 2000)
     */
    static async waitForNetworkIdle(idleTime = 2000) {
        await browser.pause(idleTime);
    }

    /**
     * Retry action until success
     * @param {Function} action - Action function to retry
     * @param {number} maxRetries - Maximum number of retries (default: 3)
     * @param {number} delay - Delay between retries in milliseconds (default: 1000)
     * @returns {Promise<any>}
     */
    static async retryAction(action, maxRetries = 3, delay = 1000) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await action();
            } catch (error) {
                console.log(`Attempt ${attempt} failed: ${error.message}`);
                lastError = error;
                
                if (attempt < maxRetries) {
                    await browser.pause(delay);
                }
            }
        }
        
        throw new Error(`Action failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
    }

    /**
     * Wait with exponential backoff
     * @param {Function} action - Action function to retry
     * @param {number} maxRetries - Maximum number of retries (default: 5)
     * @param {number} baseDelay - Base delay in milliseconds (default: 1000)
     * @returns {Promise<any>}
     */
    static async retryWithBackoff(action, maxRetries = 5, baseDelay = 1000) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await action();
            } catch (error) {
                console.log(`Attempt ${attempt} failed: ${error.message}`);
                lastError = error;
                
                if (attempt < maxRetries) {
                    const delay = baseDelay * Math.pow(2, attempt - 1);
                    await browser.pause(delay);
                }
            }
        }
        
        throw new Error(`Action failed after ${maxRetries} attempts with exponential backoff. Last error: ${lastError.message}`);
    }

    /**
     * Smart wait - combines multiple wait strategies
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {Object} options - Wait options
     * @param {number} options.timeout - Timeout in milliseconds
     * @param {boolean} options.clickable - Wait for clickable (default: false)
     * @param {boolean} options.enabled - Wait for enabled (default: false)
     * @param {string} options.text - Wait for specific text
     */
    static async smartWait(element, options = {}) {
        const { timeout = 10000, clickable = false, enabled = false, text = null } = options;
        
        await element.waitForDisplayed({ timeout });
        
        if (clickable) {
            await this.waitForClickable(element, timeout);
        }
        
        if (enabled) {
            await this.waitForEnabled(element, timeout);
        }
        
        if (text) {
            await this.waitForText(element, text, timeout);
        }
    }
}

module.exports = WaitHelper;

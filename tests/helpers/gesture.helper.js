/**
 * Gesture Helper - Provides common mobile gesture utilities
 * Encapsulates mobile-specific touch actions and gestures
 */
class GestureHelper {
    /**
     * Perform tap gesture
     * @param {WebdriverIO.Element} element - Element to tap
     */
    static async tap(element) {
        await element.click();
    }

    /**
     * Perform double tap gesture
     * @param {WebdriverIO.Element} element - Element to double tap
     */
    static async doubleTap(element) {
        await element.doubleClick();
    }

    /**
     * Perform long press gesture
     * @param {WebdriverIO.Element} element - Element to long press
     * @param {number} duration - Duration in milliseconds (default: 2000)
     */
    static async longPress(element, duration = 2000) {
        await driver.touchAction([
            { action: 'press', element },
            { action: 'wait', ms: duration },
            { action: 'release' }
        ]);
    }

    /**
     * Swipe left on screen
     * @param {number} distance - Distance percentage (0-1, default: 0.8)
     */
    static async swipeLeft(distance = 0.8) {
        const { width, height } = await driver.getWindowRect();
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width * 0.9, y: height / 2 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: width * (1 - distance), y: height / 2 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(500);
    }

    /**
     * Swipe right on screen
     * @param {number} distance - Distance percentage (0-1, default: 0.8)
     */
    static async swipeRight(distance = 0.8) {
        const { width, height } = await driver.getWindowRect();
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width * 0.1, y: height / 2 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: width * distance, y: height / 2 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(500);
    }

    /**
     * Swipe up on screen
     * @param {number} distance - Distance percentage (0-1, default: 0.8)
     */
    static async swipeUp(distance = 0.8) {
        const { width, height } = await driver.getWindowRect();
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.9 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: width / 2, y: height * (1 - distance) },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(500);
    }

    /**
     * Swipe down on screen
     * @param {number} distance - Distance percentage (0-1, default: 0.8)
     */
    static async swipeDown(distance = 0.8) {
        const { width, height } = await driver.getWindowRect();
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.1 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: width / 2, y: height * distance },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(500);
    }

    /**
     * Swipe on specific element
     * @param {WebdriverIO.Element} element - Element to swipe on
     * @param {string} direction - Direction: 'left', 'right', 'up', 'down'
     * @param {number} distance - Distance percentage (0-1, default: 0.5)
     */
    static async swipeOnElement(element, direction, distance = 0.5) {
        const location = await element.getLocation();
        const size = await element.getSize();
        
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        
        let startX, startY, endX, endY;
        
        switch (direction.toLowerCase()) {
            case 'left':
                startX = location.x + size.width * 0.9;
                startY = centerY;
                endX = location.x + size.width * (1 - distance);
                endY = centerY;
                break;
            case 'right':
                startX = location.x + size.width * 0.1;
                startY = centerY;
                endX = location.x + size.width * distance;
                endY = centerY;
                break;
            case 'up':
                startX = centerX;
                startY = location.y + size.height * 0.9;
                endX = centerX;
                endY = location.y + size.height * (1 - distance);
                break;
            case 'down':
                startX = centerX;
                startY = location.y + size.height * 0.1;
                endX = centerX;
                endY = location.y + size.height * distance;
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
                    { type: 'pointerMove', duration: 500, x: endX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    /**
     * Scroll to element by text (Android UiAutomator2)
     * @param {string} text - Text to scroll to
     * @param {number} maxScrolls - Maximum scroll attempts (default: 10)
     * @returns {WebdriverIO.Element}
     */
    static async scrollToText(text, maxScrolls = 10) {
        return await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`);
    }

    /**
     * Scroll to element by partial text (Android UiAutomator2)
     * @param {string} text - Partial text to scroll to
     * @param {number} maxScrolls - Maximum scroll attempts (default: 10)
     * @returns {WebdriverIO.Element}
     */
    static async scrollToPartialText(text, maxScrolls = 10) {
        return await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${text}"))`);
    }

    /**
     * Pinch to zoom in
     * @param {WebdriverIO.Element} element - Element to zoom in on
     */
    static async pinchZoomIn(element) {
        const location = await element.getLocation();
        const size = await element.getSize();
        
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - 50, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX - 150, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + 50, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX + 150, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    /**
     * Pinch to zoom out
     * @param {WebdriverIO.Element} element - Element to zoom out on
     */
    static async pinchZoomOut(element) {
        const location = await element.getLocation();
        const size = await element.getSize();
        
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - 150, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX - 50, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + 150, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 500, x: centerX + 50, y: centerY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }

    /**
     * Drag and drop
     * @param {WebdriverIO.Element} sourceElement - Element to drag
     * @param {WebdriverIO.Element} targetElement - Element to drop on
     */
    static async dragAndDrop(sourceElement, targetElement) {
        await sourceElement.dragAndDrop(targetElement);
    }

    /**
     * Pull to refresh gesture
     */
    static async pullToRefresh() {
        const { width, height } = await driver.getWindowRect();
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.2 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1500, x: width / 2, y: height * 0.8 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.pause(1000);
    }

    /**
     * Tap by coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    static async tapByCoordinates(x, y) {
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
     * Multi-finger tap
     * @param {WebdriverIO.Element} element - Element to tap
     * @param {number} fingers - Number of fingers (default: 2)
     */
    static async multiFingerTap(element, fingers = 2) {
        const location = await element.getLocation();
        const size = await element.getSize();
        
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        
        const actions = [];
        const spacing = 30;
        
        for (let i = 0; i < fingers; i++) {
            actions.push({
                type: 'pointer',
                id: `finger${i + 1}`,
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + (i * spacing), y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 }
                ]
            });
        }
        
        await driver.performActions(actions);
    }
}

module.exports = GestureHelper;

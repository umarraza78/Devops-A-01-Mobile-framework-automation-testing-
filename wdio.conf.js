require('dotenv').config();

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './tests/**/*.test.js'
    ],
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1, // for mobile, keep 1 to avoid conflicts
    capabilities: [{
        platformName: "Android",
        "appium:automationName": "UiAutomator2",
        "appium:deviceName": "Android Emulator",  // change if using real device
        "appium:platformVersion": "13",          // optional: use your emulator/android version
        "appium:app": "./app/myapp.apk",
        "appium:autoGrantPermissions": true,
        "appium:androidInstallTimeout": 180000,
        "appium:uiautomator2ServerInstallTimeout": 120000
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',

    // Appium server connection (IMPORTANT)
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 300000,
    connectionRetryCount: 3,

    //
    // Framework and Reporter
    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
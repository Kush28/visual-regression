// next line is optional, just for IDEs autocomplete :
/// <reference types="@applitools/eyes-testcafe" />

import Eyes from '@applitools/eyes-testcafe';

// Initialize the eyes
const eyes = new Eyes();

const mobileBrowser = [
    {
        width: 478,
        height: 680,
        name: "chrome",
    },
    {
        iosDeviceInfo: {
            deviceName: "iPhone XR",
            iosVersion: "latest",
        },
    },
];

const desktopBrowser = [
    {
        width: 1400,
        height: 680,
        name: "chrome",
    },
];

// Set page used in the test
fixture`Testcafe Demo App`.page`https://demo.applitools.com`
    // Call Close on eyes to let the server know it should display the results
    .afterEach(async () => eyes.close())
    .after(async () => {
        // Wait and collect all test results
        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences
        let allTestResults = await eyes.waitForResults(false);
        // Print results
        console.log(allTestResults);
    });

test('ultraFastTest', async t => {
    // Call Open on eyes to initialize a test session
    await eyes.open({
        t, // pass testcafe contorller
        appName: 'Demo App - Testcafe - Ultrafast',
        testName: 'Smoke Test - Testcafe - Ultrafast',
        browser: desktopBrowser,
    });

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
    await eyes.checkWindow({
        tag: "Login Window",
        target: 'window',
        fully: true
    });

    // This will create a test with two test steps.
    await t.click('#log-in');

    // Check the app page
    await eyes.checkWindow({
        tag: "App Window",
        target: 'window',
        fully: true
    });
});

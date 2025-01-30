# Software tester task

This is a recruitment task that involves preparing test cases for two scenarios:

- Searching for the word "semrush" on bing.com, filtered by content category (everything, video, news, etc.).
- Searching for the word "prowly" on google.com, filtered by date.

Additionally, a simple test automation demo has been written using Playwright and TypeScript. It partially verifies the first two test cases from the Bing scenario.

The test cases and automation assume that at least one result will be returned; they do not cover situations where no results are returned.

The test scenarios can be found in `scenarios/bing.feature` and `scenarios/google.feature`, while the automation test file's path is `tests/bing.spec.ts`.

## Installation

Assuming Node.js is already installed on your device, run:

```sh
npm install
```

Then, install Playwright:

```sh
npx playwright install
```

## Running the test automation demo

To run the automation demo, use:

```sh
npx playwright test
```

or, to run it with the browser visible:

```sh
npx playwright test --headed
```

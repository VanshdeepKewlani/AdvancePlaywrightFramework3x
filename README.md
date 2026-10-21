# Advance Playwright Framework 3x

A TypeScript end-to-end testing project built with Playwright Test. The current configuration runs the Chromium login test in a 1920 × 1080 viewport and writes results with the custom TTA HTML reporter.

## Requirements

- Node.js 20 or later
- npm
- Playwright Chromium browser

## Setup

```bash
npm install
npx playwright install chromium
```

Create a local `.env` file in the project root. Do not commit this file; it may contain credentials or other local settings.

```dotenv
TTA_ENV=qa
BASE_URL=https://app.thetestingacademy.com
QA_BASE_URL=https://app.thetestingacademy.com
STG_BASE_URL=https://stage.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com
DEV_BASE_URL=http://localhost:3000
API_BASE_URL=https://restful-booker.herokuapp.com
LOG_LEVEL=info
TEST_ENV=QA
TEST_AUTHOR=Pramod
USERNAME=admin
PASSWORD=replace-with-your-local-password
```

The current login test uses its demo account values directly in the test. Keep real credentials out of source control.

## Run tests

Run the Playwright suite:

```bash
npm test
```

Or run the custom reporter explicitly:

```bash
npm run test:report
```

The Chromium project runs headed by default for local use. In CI, the config switches to headless mode. To run headed locally, a graphical desktop session is required.

## Reports

The custom reporter creates a timestamped HTML report under `tta-report/`, for example `tta-report/report_YYYYMMDD_HHMMSS.html`. Screenshots, videos, and traces from the run are saved alongside the report. Playwright test artifacts are also written to `test-results/`.

## Project layout

```text
src/
  pages/       Page object classes
  tests/       Playwright test specs
  utils/       Test utilities and the custom HTML reporter
playwright.config.ts
```

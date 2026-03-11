# Playwright UI Automation – SauceDemo

UI automation framework built with **Playwright** for the SauceDemo demo application.

The project demonstrates a clean test architecture using:
- Page Object Model
- reusable test flows
- externalized test data
- Playwright project with session reuse
- Allure reporting

Application under test:  
https://www.saucedemo.com

# Tech Stack

- Playwright
- JavaScript (Node.js)
- Faker (test data generation)
- Allure Playwright reporter

# Project Structure

src
├ config → routes, users, auth paths
├ data → test data and validation cases
├ pages → Page Object classes
└ flows → reusable business flows

tests
├ setup → login and save authentication state
├ public → tests without authentication
└ e2e → authenticated end-to-end tests

# Test Scenarios

The framework covers the following UI scenarios:

Public tests
- invalid login
- locked user login

Authenticated tests
- add products to cart
- remove product from cart
- verify cart contents
- checkout validation
- checkout happy path
- product sorting
- logout

# Installation

Install dependencies:npm install

Install browsers:npx playwright install

# Run Tests

Run all tests:npm test

Run only authenticated tests:npm run test:e2e

Run public tests:npm run test:public

Run headed:npm run test:headed

Debug mode:npm run test:debug

## Reports

Playwright HTML report:

npx playwright show-report

Allure report:

npm run allure:generate


# Notes

Authentication is handled through a **setup project** which logs in once and stores browser state.  
The stored session is reused by authenticated tests to avoid repeated login steps.
npm run allure:open
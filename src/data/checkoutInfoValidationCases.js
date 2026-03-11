const { createCheckoutUser } = require('./checkoutUserFactory');

// Build a valid checkout user and override only the needed field for negative tests
function buildUser(overrides = {}) {
  return { ...createCheckoutUser(), ...overrides };
}

// Data-driven negative cases for checkout information validation
const checkoutInfoValidationCases = [
  { name: 'missing first name', user: buildUser({ firstName: '' }), expectedError: 'Error: First Name is required' },
  { name: 'missing last name', user: buildUser({ lastName: '' }), expectedError: 'Error: Last Name is required' },
  { name: 'missing postal code', user: buildUser({ postalCode: '' }), expectedError: 'Error: Postal Code is required' },
];

module.exports = { checkoutInfoValidationCases };
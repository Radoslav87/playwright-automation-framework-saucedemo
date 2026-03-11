const { faker } = require('@faker-js/faker');

// Generate valid checkout data for happy path and validation tests
function createCheckoutUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode('#####'),
  };
}

module.exports = { createCheckoutUser };
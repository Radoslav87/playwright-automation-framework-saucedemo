// Reusable login scenarios for public negative login tests
const loginCases = {
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: 'Epic sadface: Username and password do not match any user in this service',
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
};

module.exports = { loginCases };
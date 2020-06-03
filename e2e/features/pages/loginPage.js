const basePage = require('../pages/basePage')

const loginMobilElement = {
  loginScreen: 'login-screen',
  usernameField: 'login-username-field',
  passwordField: 'login-password-field',
  loginMsgError: 'login-error-toast',
  homeScreen: 'home-screen',
  logoutButton: 'logout-button',
}

module.exports.loadLoginScreen = async () => {
  await basePage.waitVisibleElement('id', loginMobilElement.loginScreen)
}

module.exports.typeUsernameField = async text => {
  await basePage.waitVisibleElement('id', loginMobilElement.usernameField)
  await basePage.typeText('id', loginMobilElement.usernameField, text)
  await basePage.tapReturn('id', loginMobilElement.usernameField)
}

module.exports.typePasswordField = async text => {
  await basePage.waitVisibleElement('id', loginMobilElement.passwordField)
  await basePage.typeText('id', loginMobilElement.passwordField, text)
  await basePage.tapReturn('id', loginMobilElement.passwordField)
}

module.exports.loadHomeScreen = async () => {
  await basePage.waitVisibleElement('id', loginMobilElement.homeScreen)
}

module.exports.loginUser = async (username, password) => {
  await this.typeUsernameField(username)
  await this.typePasswordField(password)
}

module.exports.loadMsgError = async () => {
  await basePage.waitVisibleElement('id', loginMobilElement.loginMsgError)
}

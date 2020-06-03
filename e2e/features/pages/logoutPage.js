const basePage = require('./basePage')

const logoutMobilElemet = {
  logoutButton: 'logout-button',
}

module.exports.tapLogoutButton = async () => {
  await basePage.verifyVisibleMobilElement('id', logoutMobilElemet.logoutButton)
  await basePage.tapMobileElemet('id', logoutMobilElemet.logoutButton)
}

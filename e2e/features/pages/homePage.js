const basePage = require('../pages/basePage')

const homeMobilElement = {
  misDatosButton: 'Mis datos',
}

module.exports.tapMisDatosButton = async () => {
  await basePage.verifyVisibleMobilElement('text', homeMobilElement.misDatosButton)
  await basePage.tapMobileElemet('text', homeMobilElement.misDatosButton)
}

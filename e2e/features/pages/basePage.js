/* eslint-disable no-return-await, no-undef, func-names, eqeqeq, no-else-return */

const timeOut = {
  small: 25000,
  medium: 5000,
  large: 10000,
}
module.exports.getMobilElement = function(identifier, mobilElement) {
  if (identifier == 'id') {
    return element(by.id(mobilElement))
  } else if (identifier == 'text') {
    return element(by.text(mobilElement))
  } else if (identifier == 'label') {
    return element(by.label(mobilElement))
  } else {
    throw new Error(`The ${identifier} identifier does not exits.`)
  }
}

module.exports.verifyVisibleMobilElement = async (identifier, mobilElement) => {
  return await expect(this.getMobilElement(identifier, mobilElement)).toBeVisible()
}

module.exports.typeText = async (identifier, mobilElement, text) => {
  return await this.getMobilElement(identifier, mobilElement).typeText(text)
}

module.exports.tapMobileElemet = async (identifier, mobilElement) => {
  return await this.getMobilElement(identifier, mobilElement).tap()
}

module.exports.waitVisibleElement = async (identifier, mobilElement) => {
  return await waitFor(this.getMobilElement(identifier, mobilElement))
    .toBeVisible()
    .withTimeout(timeOut.small)
}

module.exports.tapReturn = async (identifier, mobilElement) => {
  return await this.getMobilElement(identifier, mobilElement).tapReturnKey()
}

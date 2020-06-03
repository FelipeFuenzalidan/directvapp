/* eslint-disable no-console, eqeqeq, no-new, no-undef, babel/new-cap*/
const { When, Then } = require('cucumber')
const loginPage = require('../pages/loginPage')
const homePage = require('../pages/homePage')
const logoutPage = require('../pages/logoutPage')

When('I login the {string} and {string} for the {string} user', async (username, password, typeUser) => {
  await loginPage.loadLoginScreen()
  if (typeUser == 'postpaid' || typeUser == 'prepaid') {
    await loginPage.loginUser(username, password)
  } else {
    throw new Error(`The ${typeUser} type user does not exits.`)
  }
})

Then('I verify the login is successful', async () => {
  await loginPage.loadHomeScreen()
  await homePage.tapMisDatosButton()
  await logoutPage.tapLogoutButton()
})

Then('I verify that the message is displayed', async () => {
  await loginPage.loadMsgError()
})

/* eslint-disable babel/new-cap, import/no-unresolved */
const detox = require('detox')
const { Before, BeforeAll, AfterAll, After } = require('cucumber')
const config = require('../../../package.json').detox
const adapter = require('./adapter')

BeforeAll(async () => {
  await detox.init(config, { launchApp: false })
  await detox.device.launchApp({
    permissions: {
      notifications: 'YES',
      location: 'always',
    },
  })
})

Before(async context => {
  await detox.device.reloadReactNative()
  await adapter.beforeEach(context)
})

After(async context => {
  await adapter.afterEach(context)
})

AfterAll(async () => {
  await detox.cleanup()
})

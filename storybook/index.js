/* eslint-disable import/no-default-export */
import { AppRegistry } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'
// eslint-disable-next-line import/no-unresolved, import/extensions
import { loadStories } from './storyLoader'

import './rn-addons'

import { withWrapper, withThemeProvider, useToggleThemeProvider } from './decorators'

/**
 * Common decorators
 */

addDecorator(withWrapper)
addDecorator(useToggleThemeProvider)
addDecorator(withThemeProvider)

// import stories
configure(() => {
  loadStories()
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
})

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('DtvSelfCare', () => StorybookUIRoot)

export default StorybookUIRoot

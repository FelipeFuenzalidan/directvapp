import { Navigation } from 'react-native-navigation'
import Storybook from '../storybook'
import '~/i18n'
import { ScreenIds } from '~/navigation'

Navigation.registerComponent(ScreenIds.LOGIN, () => Storybook)

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: ScreenIds.LOGIN,
      },
    },
  })
})

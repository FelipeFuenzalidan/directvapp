/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Navigation } from 'react-native-navigation'
import { ThemeProvider } from 'styled-components/native'
import { isIphoneX } from 'react-native-iphone-x-helper'

import i18n from '~/i18n'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { themes } from '~/theme/theme'

/**
 * Screen IDs
 * These will be imported to then navigate to each one
 */
export const ScreenIds = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  ERROR_EXTENSIONS: 'ERROR_EXTENSIONS',
  PLAN_DETAILS: 'PLAN_DETAILS',
  INVOICE: 'INVOICE',
  BALANCE: 'BALANCE',
  HELP: 'HELP',
  PROFILE: 'PROFILE',
  NOTIFICATIONS: 'NOTIFICATIONS',
}

const BOTTOM_TABS_ID = 'BOTTOM_TABS_ID'

/**
 * This functions register every screen
 *
 * We use `require` instead of `import` so that we avoid dependency cycles
 */
export function init() {
  // Register screens
  registerScreen(ScreenIds.HOME, require('~/screens/HomeScreen').default)
  registerScreen(ScreenIds.LOGIN, require('~/screens/LoginScreen').default)
  registerScreen(ScreenIds.ERROR_EXTENSIONS, require('~/screens/ErrorExtensionsScreen').default)
  registerScreen(ScreenIds.PLAN_DETAILS, require('~/screens/PlanDetailsScreen').default)
  registerScreen(ScreenIds.INVOICE, require('~/screens/InvoiceScreen').default)
  registerScreen(ScreenIds.BALANCE, require('~/screens/BalanceScreen').default)
  registerScreen(ScreenIds.HELP, require('~/screens/HelpScreen').default)
  registerScreen(ScreenIds.PROFILE, require('~/screens/ProfileScreen').default)
  registerScreen(ScreenIds.NOTIFICATIONS, require('~/screens/NotificationsScreen').default)
}

/**
 * Helpers
 */

function registerScreen(screenId, ScreenComponent) {
  Navigation.registerComponent(screenId, () => props => {
    return (
      <ThemeProvider theme={themes.post}>
        <ScreenComponent {...props} />
      </ThemeProvider>
    )
  })
}

function getIconOptions(icon) {
  return icon
    ? {
        iconColor: Colors.WHITE,
        selectedIconColor: Colors.WHITE,
        icon,
      }
    : {}
}

function getBottomTab(screenId, text, icon) {
  return {
    stack: {
      id: `${screenId}-stack`,
      options: {
        bottomTabs: {
          animate: true, // Controls whether BottomTabs visibility changes should be animated
          backgroundColor: Colors.LIGHT_BLUE_900,
        },
      },
      children: [
        {
          component: {
            name: screenId,
            options: {
              bottomTab: {
                text,
                ...getIconOptions(icon),
              },
            },
          },
        },
      ],
    },
  }
}

export const TabIndexes = {
  HOME: 0,
  PLAN_DETAILS: 1,
  INVOICE: 2,
  HELP: 3,
  PROFILE: 4,
}

export function switchToTab(tabIndex) {
  Navigation.mergeOptions(BOTTOM_TABS_ID, {
    bottomTabs: {
      currentTabIndex: tabIndex,
    },
  })
}

export function setDefaultNavigationOptions() {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      drawBehind: false,
      style: isIphoneX() ? 'dark' : 'light',
    },

    topBar: {
      visible: false,
      height: 0,
    },

    layout: {
      orientation: 'portrait',
      componentBackgroundColor: Colors.WHITE,
    },

    bottomTab: {
      fontFamily: Fonts.dtvcurve.medium,
      selectedTextColor: Colors.WHITE,
      textColor: Colors.WHITE,
      selectedFontSize: 12,
      fontSize: 12,
      backgroundColor: Colors.LIGHT_BLUE_900,
    },

    bottomTabs: {
      animate: false,
      visible: true,
      hideShadow: true,
      titleDisplayMode: 'alwaysShow',
      elevation: 5,
    },
  })
}

/**
 * Navigation flows
 *
 * These methods launch different "flows"
 */

export function startLoginFlow(forceLogin = false) {
  Navigation.setRoot({
    root: {
      component: {
        name: ScreenIds.LOGIN,
        passProps: {
          forceLogin,
        },
      },
    },
    animate: false,
  })
}

export function startLoggedInFlow(isPrePaid) {
  const thirdTab = isPrePaid
    ? getBottomTab(ScreenIds.BALANCE, i18n.t('tabs:balance'), require('~//images/coin.png'))
    : getBottomTab(ScreenIds.INVOICE, i18n.t('tabs:invoice'), require('~/images/invoice.png'))

  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: BOTTOM_TABS_ID,
        options: {
          topBar: { visible: false },
        },
        children: [
          getBottomTab(ScreenIds.HOME, i18n.t('tabs:home'), require('~/images/home.png')),
          getBottomTab(ScreenIds.PLAN_DETAILS, i18n.t('tabs:plan'), require('~/images/miplan.png')),
          thirdTab,
          getBottomTab(ScreenIds.HELP, i18n.t('tabs:help'), require('~/images/ayuda.png')),
          getBottomTab(ScreenIds.PROFILE, i18n.t('tabs:profile'), require('~/images/perfil.png')),
        ],
      },
    },
  })
}

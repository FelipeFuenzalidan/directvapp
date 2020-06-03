import React from 'react'
import { button } from '@storybook/addon-knobs'

import { CenterView } from '../src/components/storybook/CenterView'
import { ThemeProvider, useTheme } from '../src/theme/ThemeProvider'

/*
 *  Decorators
 */

// Center stories wrapper
export const withWrapper = story => <CenterView>{story()}</CenterView>

// Theme Switcher button for toggling theme in every story
export const withThemeProvider = getStory => {
  return <ThemeProvider>{getStory()}</ThemeProvider>
}

export const useToggleThemeProvider = getStory => {
  return <Wrapper>{getStory()}</Wrapper>
}

const Wrapper = ({ children }) => {
  const { setTheme, theme } = useTheme()
  button('Toggle user mode', () => setTheme(theme === 'pre' ? 'post' : 'pre'))

  return children
}

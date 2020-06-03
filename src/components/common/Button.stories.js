import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { Button } from './Button'
import { Colors } from '~/theme/Colors'

storiesOf('Button', module)
  .add('With text', () => (
    <TransparentWrapper>
      <Button text="Base Button" onPress={action('switch')} />
    </TransparentWrapper>
  ))
  .add('Outline with text', () => (
    <TransparentWrapper>
      <Button text="Transparent Button" onPress={action('switch')} outline />
    </TransparentWrapper>
  ))

/*
 * Styles
 */

// ADDED BACKGROUND TO SHOW TRANSPARENT BUTTON PROPERLY

const TransparentWrapper = styled(View)({
  backgroundColor: Colors.INDIGO,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
})

import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { withKnobs, text } from '@storybook/addon-knobs'

import { ThrottledTouchableOpacity } from './ThrottledTouchableOpacity'
import { withWrapper } from '../../../storybook/decorators'

storiesOf('Throttled Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withWrapper)
  .add('with text', () => (
    <ThrottledTouchableOpacity onPress={action('clicked-text')}>
      <ThemedText>{text('Label', 'Hello Storybook')}</ThemedText>
    </ThrottledTouchableOpacity>
  ))
  .add('with different throttle interval', () => (
    <ThrottledTouchableOpacity throttleInterval={5000} onPress={action('clicked-different-throttle')}>
      <ThemedText>With 5 seconds of throttle</ThemedText>
    </ThrottledTouchableOpacity>
  ))
  .add('with testID', () => (
    <ThrottledTouchableOpacity testID="some-test-id" onPress={action('clicked-with-test-id')}>
      <ThemedText>With test ID</ThemedText>
    </ThrottledTouchableOpacity>
  ))

/*
 * Styles
 */

const ThemedText = styled(Text)({
  color: props => props.theme.secondary,
})

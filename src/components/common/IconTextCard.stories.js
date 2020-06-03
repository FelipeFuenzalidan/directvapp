import React from 'react'
import { View } from 'react-native'
import { withKnobs, text } from '@storybook/addon-knobs'
import styled from 'styled-components/native'

import { storiesOf } from '@storybook/react-native'

import { IconTextCard } from './IconTextCard'
import { Colors } from '~/theme/Colors'
import { WINDOW_WIDTH } from '~/styles/helpers'

storiesOf('IconTextCard', module)
  .addDecorator(withKnobs)
  .add('Simple', () => (
    <TransparentWrapper>
      <IconTextCard
        iconSource={require('~/images/invoice.png')}
        text={text('Title', 'EL numero de tu tarjeta prepago es: 0000000923885')}
      />
    </TransparentWrapper>
  ))
  .add('With different background Color', () => (
    <TransparentWrapper>
      <IconTextCard
        iconSource={require('~/images/invoice.png')}
        text={text('Title', 'EL numero de tu tarjeta prepago es: 0000000923885')}
        backgroundColor={Colors.RED}
      />
    </TransparentWrapper>
  ))
  .add('With different content Color', () => (
    <TransparentWrapper>
      <IconTextCard
        iconSource={require('~/images/invoice.png')}
        text={text('Title', 'EL numero de tu tarjeta prepago es: 0000000923885')}
        backgroundColor={Colors.RED}
        iconColor={Colors.WHITE}
        textColor={Colors.WHITE}
      />
    </TransparentWrapper>
  ))

/*
 * Styles
 */

// ADDED BACKGROUND TO SHOW TRANSPARENT BUTTON PROPERLY

const TransparentWrapper = styled(View)({
  backgroundColor: Colors.PATTENTS_BLUE,
  justifyContent: 'center',
  width: WINDOW_WIDTH,
  padding: 20,
})

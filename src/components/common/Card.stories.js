import React from 'react'
import { View, Text } from 'react-native'
import { withKnobs, text } from '@storybook/addon-knobs'
import styled from 'styled-components/native'

import { storiesOf } from '@storybook/react-native'

import { Card } from './Card'
import { Colors } from '~/theme/Colors'
import { WINDOW_WIDTH } from '~/styles/helpers'
import { RoundButton } from './RoundButton'

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('Simple', () => (
    <TransparentWrapper>
      <Card title={text('Title', 'This is a simple card')} />
    </TransparentWrapper>
  ))
  .add('With Icon', () => (
    <TransparentWrapper>
      <Card
        title={text('Title', 'This is a simple card')}
        icon={require('~/images/invoice.png')}
        iconColor={Colors.INDIGO}
      />
    </TransparentWrapper>
  ))
  .add('With Defined BackgroundColor', () => (
    <TransparentWrapper>
      <Card
        title={text('Title', 'This is a simple card')}
        icon={require('~/images/invoice.png')}
        backgroundColor={Colors.RED}
      />
    </TransparentWrapper>
  ))
  .add('With Footer Button', () => (
    <TransparentWrapper>
      <Card
        title={text('Title', 'This is a simple card')}
        icon={require('~/images/invoice.png')}
        footer={<RoundButton text="Ver más" buttonWidth={126} buttonColor={Colors.LIGHT_BLUE_900} onPress={() => {}} />}
        footerAlignment="flex-end"
      >
        <View>
          <Text>HOLA</Text>
          <Text>TESTING</Text>
          <Text>LOS</Text>
          <Text>CHILDREN</Text>
        </View>
      </Card>
    </TransparentWrapper>
  ))
  .add('With Expanded Functionality', () => (
    <TransparentWrapper>
      <Card
        title={text('Title', 'This is a simple card')}
        icon={require('~/images/invoice.png')}
        iconColor={Colors.RED}
        collapsible
        footer={<RoundButton text="Ver más" buttonWidth={126} buttonColor={Colors.LIGHT_BLUE_900} onPress={() => {}} />}
        footerAlignment="flex-end"
        titleColor={Colors.RED}
        arrowColor={Colors.RED}
      >
        <View>
          <Text>HOLA</Text>
          <Text>TESTING</Text>
          <Text>LOS</Text>
          <Text>CHILDREN</Text>
        </View>
      </Card>
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

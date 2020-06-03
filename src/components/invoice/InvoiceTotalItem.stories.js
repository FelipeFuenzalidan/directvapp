/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import { InvoiceTotalItem } from './InvoiceTotalItem'

storiesOf('Invoice Total Item', module).add('default', () => (
  <View style={{ width: 400 }}>
    <InvoiceTotalItem paymentTotal="$3155,00" />
  </View>
))

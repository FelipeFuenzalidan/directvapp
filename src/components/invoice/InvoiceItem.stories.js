/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import { InvoiceItem } from './InvoiceItem'

storiesOf('Invoice Item', module).add('default', () => (
  <View style={{ width: 400 }}>
    <InvoiceItem description="Directv HD Oro Plus HD" paymentDue="$2910,00" />
  </View>
))

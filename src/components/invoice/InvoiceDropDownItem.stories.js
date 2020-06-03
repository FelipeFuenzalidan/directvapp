/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { withKnobs, select } from '@storybook/addon-knobs'
import { View } from 'react-native'

import { InvoiceDropDownItem } from './InvoiceDropDownItem'
import { InvoiceItemTypes } from '~/constants/InvoiceItemTypes'

storiesOf('Invoice DropDown Item', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <View style={{ width: 400 }}>
      <InvoiceDropDownItem
        description="Directv HD Oro Plus HD"
        paymentDue="$2910,00"
        itemType={select(
          'Item Type',
          {
            BASIC: InvoiceItemTypes.BASIC,
            ADITIONALS: InvoiceItemTypes.ADITIONALS,
            PREMIUM: InvoiceItemTypes.PREMIUM,
            OTHERS: InvoiceItemTypes.OTHERS,
          },
          InvoiceItemTypes.BASIC
        )}
      />
    </View>
  ))

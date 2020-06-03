/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { InvoiceOffers } from './InvoiceOffers'

const offers = [
  {
    name: 'Upgrade HD Cliente Mix',
    endDateTime: '2100-01-01',
  },
  {
    name: 'HBD Mfee 1 $0 Eev905',
    endDateTime: '2020-05-28',
  },
]

storiesOf('Invoice Offers', module).add('default', () => <InvoiceOffers productOffers={offers} />)

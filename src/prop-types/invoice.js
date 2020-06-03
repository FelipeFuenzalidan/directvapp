import PropTypes from 'prop-types'
import { values } from 'lodash'
import { InvoiceItemTypes } from '~/constants/InvoiceItemTypes'

export const invoiceItemDetailsPropType = PropTypes.shape({
  description: PropTypes.string,
  paymentDue: PropTypes.number,
})

export const invoiceItemPropType = PropTypes.shape({
  itemDescription: PropTypes.string,
  paymentDue: PropTypes.number,
  itemType: PropTypes.oneOf(values(InvoiceItemTypes)),
  itemDetails: PropTypes.arrayOf(invoiceItemDetailsPropType),
})

export const productOfferPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  endDateTime: PropTypes.string.isRequired,
})

export const invoicePropType = PropTypes.shape({
  clientNo: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  paymentTotal: PropTypes.number.isRequired,
  paymentDueDate: PropTypes.instanceOf(Date).isRequired,
  invoiceItems: PropTypes.arrayOf(invoiceItemPropType).isRequired,
  productOffers: PropTypes.arrayOf(productOfferPropType).isRequired,
})

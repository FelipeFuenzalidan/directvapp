import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { View, Text, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import { parseISO, format } from 'date-fns'
import locale from 'date-fns/locale/es'

import { InvoiceHeader } from '~/components/invoice/InvoiceHeader'
import { InvoicePaymentDue } from '~/components/invoice/InvoicePaymentDue'
import { invoicePropType } from '~/prop-types/invoice'
import { SectionHeader } from '~/components/common/SectionHeader'
import { Colors } from '~/theme/Colors'
import { InvoiceDropDownItem } from '~/components/invoice/InvoiceDropDownItem'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '~/styles/helpers'
import { InvoiceTotalItem } from '~/components/invoice/InvoiceTotalItem'
import { InvoiceOffers } from '~/components/invoice/InvoiceOffers'
import { CompactButton } from '~/components/common/CompactButton'
import { Fonts } from '~/theme/Fonts'
import { formatAmount } from '~/lib/utils'

/*
 * Constants
 */

export const InvoiceView = ({
  invoiceDetails,
  user,
  fetching,
  onPayInvoicePress,
  onViewLastInvoicesPress,
  onContactPress,
  onSharePress,
  errorOnInvoiceDetails,
  onPullToRefresh,
}) => {
  const { categories, productOffers } = invoiceDetails || {}
  const { id, product, invoice } = user || {}
  const { t } = useTranslation('invoice')
  // const formattedInvoice = format(invoiceDueDate, 'dd/MM')
  // eslint-disable-next-line no-console

  const formattedDueDate = useMemo(() => (invoice?.dueDate ? format(parseISO(invoice.dueDate), 'dd/MM/yyyy') : null), [
    invoice,
  ])

  const formattedInvoicePeriod = useMemo(
    () => (invoice?.dueDate ? format(parseISO(invoice.dueDate), 'MMMM yyyy', { locale }) : null),
    [invoice]
  )

  const showInvoiceSummary = !isEmpty(user) && !isEmpty(invoice)
  const showInvoiceDetails = !isEmpty(categories) && !isEmpty(invoice) && !fetching && !errorOnInvoiceDetails

  return (
    <Container>
      <SectionHeader title={t('title')} iconSource={require('../images/invoice.png')} />
      {showInvoiceSummary && (
        <>
          <HeaderContainer>
            <InvoiceHeader clientNo={id} plan={product.plan} expirationDate={formattedDueDate} />
          </HeaderContainer>
        </>
      )}
      <ScrollableContainer
        refreshControl={
          <RefreshControl tintColor={Colors.LIGHT_BLUE_900} refreshing={fetching} onRefresh={onPullToRefresh} />
        }
      >
        <BackgroundContainer>
          {errorOnInvoiceDetails && <ErrorText>{t('serviceError')}</ErrorText>}
          {showInvoiceDetails && (
            <>
              <InvoicePaymentDue
                loading={fetching}
                paymentTotal={`$${formatAmount(invoice?.totalAmount)}`}
                paymentDueDate={formattedInvoicePeriod}
                onPayInvoicePress={onPayInvoicePress}
              />
              <DetailsContainer>
                {showInvoiceDetails &&
                  categories.map(item => {
                    return (
                      <InvoiceDropDownItem
                        key={item.id}
                        description={item.description}
                        paymentDue={`$${formatAmount(item?.categoryTotalAmount?.amount)}`}
                        itemType={item.id}
                        itemDetails={item.invoiceLines}
                      />
                    )
                  })}
              </DetailsContainer>
              {!isEmpty(invoice) && <InvoiceTotalItem paymentTotal={`$${formatAmount(invoice?.totalAmount)}`} />}
            </>
          )}
        </BackgroundContainer>

        <InvoiceBottomContainer>
          {!isEmpty(productOffers) && <InvoiceOffers productOffers={productOffers} />}
          <ButtonsContainer>
            <CompactButton
              text={t('buttons.lastInvoices')}
              iconSource={require('~/images/invoices.png')}
              onPress={onViewLastInvoicesPress}
            />
            <ButtonSpacer />
            <CompactButton
              text={t('buttons.doubt')}
              iconSource={require('~/images/whatsapp.png')}
              onPress={onContactPress}
            />
            <ButtonSpacer />

            <CompactButton
              text={t('buttons.share')}
              iconSource={require('~/images/share.png')}
              outline
              onPress={onSharePress}
            />
          </ButtonsContainer>
        </InvoiceBottomContainer>
      </ScrollableContainer>
    </Container>
  )
}

/*
 * PropTypes
 */

InvoiceView.propTypes = {
  invoiceDetails: invoicePropType.isRequired,
  user: PropTypes.shape({
    clientNo: PropTypes.number,
    plan: PropTypes.string,
    paymentTotal: PropTypes.number,
    paymentDueDate: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  fetching: PropTypes.bool,
  onPayInvoicePress: PropTypes.func.isRequired,
  onViewLastInvoicesPress: PropTypes.func.isRequired,
  onContactPress: PropTypes.func.isRequired,
  onSharePress: PropTypes.func.isRequired,
  errorOnInvoiceDetails: PropTypes.bool,
  onPullToRefresh: PropTypes.func.isRequired,
}

InvoiceView.defaultProps = {
  fetching: false,
  errorOnInvoiceDetails: false,
}

/*
 * Styles
 */

const Container = styled(View)({
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  backgroundColor: Colors.PATTENTS_BLUE,
  flex: 1,
})

const HeaderContainer = styled(View)({
  backgroundColor: Colors.BLUE_GRAY,
})

const BackgroundContainer = styled(View)({
  backgroundColor: Colors.BLUE_GRAY,
  flex: 1,
})
const DetailsContainer = styled(View)({
  paddingHorizontal: 20,
  paddingVertical: 10,
})

const InvoiceBottomContainer = styled(View)({
  justifyContent: 'flex-end',
})

const ButtonsContainer = styled(View)({
  padding: 20,
  paddingBottom: isIphoneX() ? getBottomSpace() : 20,
  backgroundColor: Colors.PATTENTS_BLUE,
})

const ButtonSpacer = styled(View)({
  height: 8,
})

const ErrorText = styled(Text)({
  color: Colors.RED,
  fontSize: 18,
  fontFamily: Fonts.dtvcurve.medium,
  margin: 10,
  textAlign: 'center',
})

const ScrollableContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}))({
  flex: 1,
  height: '100%',
})

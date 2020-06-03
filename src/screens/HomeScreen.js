import React, { useCallback, useMemo } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { parseISO } from 'date-fns'
import { isEmpty } from 'lodash'

import { Fonts } from '~/theme/Fonts'
import { useLoggedUser } from '~/hooks/auth'

import { Colors } from '~/theme/Colors'
import { ImageBanner } from '~/components/home/ImageBanner'
import { InvoiceSummary } from '~/components/home/InvoiceSummary'
import { switchToTab, TabIndexes } from '~/navigation'
import { Button } from '~/components/common/Button'
import { openInvoicePaymentWeb, openRechargeWeb } from '~/lib/external-links'
import { useBalance } from '~/hooks/balance'
import { BalanceCard } from '~/components/balance/BalanceCard'
import { WorkOrderCard } from '~/components/common/WorkOrderCard'

const HomeScreen = () => {
  const { t } = useTranslation('home')
  const { user, isPostPaid, isPrePaid, hasAutomaticDebit } = useLoggedUser()
  const { daysToDisconnectionDate, disconnectionDate, fetching } = useBalance()

  const handlePayInvoicePress = useCallback(() => {
    if (user?.id) {
      openInvoicePaymentWeb(user.id)
    }
  }, [user])

  const handleSeeInvoiceDetailPress = useCallback(() => switchToTab(TabIndexes.INVOICE), [])

  const handleErrorCodePress = useCallback(() => switchToTab(TabIndexes.HELP), [])

  const handleSeePromotionsPress = useCallback(() => switchToTab(TabIndexes.PLAN_DETAILS), [])

  const handleRechargePress = useCallback(() => {
    if (user?.smartCard?.id) {
      openRechargeWeb(user.smartCard.id)
    }
  }, [user])

  const invoice = user?.invoice
  const showInvoice = isPostPaid && !isEmpty(invoice)

  const invoiceDueDate = useMemo(() => (user?.invoice?.dueDate ? parseISO(user.invoice.dueDate) : null), [user])

  const workOrder = user?.workOrders[0]

  return (
    <>
      <ImageBanner />
      {user && (
        <CustomerInfo>
          <CustomerName>{t('welcome')({ name: user.name.first })}</CustomerName>
          {user.product?.plan && (
            <CustomerPlanBadge>
              <CustomerPlanText>{user.product.plan}</CustomerPlanText>
            </CustomerPlanBadge>
          )}
        </CustomerInfo>
      )}
      <SafeArea>
        <Container testID="home-screen">
          <View>
            {workOrder && <WorkOrderCard workOrder={workOrder} />}
            {showInvoice && (
              <InvoiceSummary
                alreadyPaid={invoice.isPayed}
                automaticDebit={hasAutomaticDebit}
                totalAmount={invoice.totalAmount}
                paymentDueDate={invoiceDueDate}
                onPayInvoicePress={handlePayInvoicePress}
                onSeeDetailPress={handleSeeInvoiceDetailPress}
              />
            )}
            {isPrePaid && (
              <BalanceCard
                loading={fetching}
                availability={daysToDisconnectionDate}
                dueDate={disconnectionDate}
                onRechargePress={handleRechargePress}
              />
            )}
          </View>

          <CallToActions>
            <Button text={t('errorCodeButton')} onPress={handleErrorCodePress} />
            <Spacer />
            <Button text={t('seePromotionsButton')} onPress={handleSeePromotionsPress} />
          </CallToActions>
        </Container>
      </SafeArea>
    </>
  )
}

/*
 * Styles
 */
const SafeArea = styled(SafeAreaView)({
  flex: 1,
})

const CustomerInfo = styled(SafeAreaView)({
  position: 'absolute',
  top: 10,
  left: 15,
  alignItems: 'flex-start',
  backgroundColor: 'transparent',
})

const Container = styled(View)({
  flex: 1,
  paddingVertical: 20,
  paddingHorizontal: 10,
  justifyContent: 'space-between',
})

const CustomerName = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 15,
  color: Colors.WHITE,
  textShadowColor: '#fafafa',
  textShadowOffset: { width: 0.5, height: 0.5 },
  textShadowRadius: 1,
})

const CustomerPlanBadge = styled(View)({
  marginTop: 7,
  paddingHorizontal: 10,
  paddingVertical: 5,
  backgroundColor: Colors.LIGHT_GREY,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: Colors.ALT_GREY,
  alignItems: 'center',
})

const CustomerPlanText = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 13,
  color: props => props.theme.primary,
})

const CallToActions = styled(View)({
  width: '100%',
  alignItems: 'center',
  marginBottom: 10,
})

const Spacer = styled(View)({
  height: 10,
})

HomeScreen.options = {
  statusBar: {
    style: 'light',
  },
}

export default HomeScreen

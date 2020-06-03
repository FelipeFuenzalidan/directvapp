import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'

import { SectionHeader } from '~/components/common/SectionHeader'
import { Colors } from '~/theme/Colors'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '~/styles/helpers'
import { IconTextCard } from '~/components/common/IconTextCard'
import { BalanceCard } from '~/components/balance/BalanceCard'
import { balancePropTypes } from '~/prop-types/balance'
import { BalanceButtonsCard } from '~/components/balance/BalanceButtonsCard'

/*
 * Constants
 */

export const BalanceView = ({
  cardNumber,
  fetching,
  data,
  onRechargePress,
  onPullToRefresh,
  onSOSPress,
  onGiveMeBalancePress,
}) => {
  const { availability, dueDate } = data
  const { t } = useTranslation('balance')

  return (
    <Container>
      <SectionHeader title={t('title')} iconSource={require('../images/invoice.png')} />
      <ContentContainer
        refreshControl={
          <RefreshControl tintColor={Colors.LIGHT_BLUE_900} refreshing={fetching} onRefresh={onPullToRefresh} />
        }
      >
        {!isEmpty(cardNumber) && (
          <IconTextCard
            iconSource={require('~/images/tarjeta.png')}
            text={t('cardNumber')({ cardNumber })}
            iconColor={Colors.LIGHT_BLUE_900}
          />
        )}
        <CardSpacer />
        <BalanceCard
          loading={fetching}
          availability={availability}
          dueDate={dueDate}
          onRechargePress={onRechargePress}
        />
        <CardSpacer />
        <BalanceButtonsCard onSOSPress={onSOSPress} onGiveMeBalancePress={onGiveMeBalancePress} />
        <CardSpacer />
      </ContentContainer>
    </Container>
  )
}

/*
 * PropTypes
 */

BalanceView.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  data: balancePropTypes.isRequired,
  onRechargePress: PropTypes.func.isRequired,
  onSOSPress: PropTypes.func.isRequired,
  onGiveMeBalancePress: PropTypes.func.isRequired,
  onPullToRefresh: PropTypes.func.isRequired,
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

const ContentContainer = styled(ScrollView)({
  padding: 20,
})

const CardSpacer = styled(View)({
  height: 16,
})

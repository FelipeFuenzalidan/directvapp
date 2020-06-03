import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { isNil } from 'lodash'

import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { Card } from '~/components/common/Card'
import { Button } from '~/components/common/Button'

export const BalanceCard = ({ availability, dueDate, onRechargePress, loading }) => {
  const { t } = useTranslation('balance')

  const formattedDueDate = !isNil(dueDate) && format(parseISO(dueDate), `cccc dd 'de' LLLL`, { locale: es })
  const hasAvailability = availability > 0

  return (
    <Card
      icon={require('~/images/coin.png')}
      title={t('title')}
      footer={<Button text={t('buttons.recharge')} backgroundColor={Colors.AMBER} compact onPress={onRechargePress} />}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ContentContainer>
          <AvailabilityTextContainer>
            <AvailabilityDescription>
              {hasAvailability ? t('availabilityDescription') : t('noAvailability')}
            </AvailabilityDescription>
            {hasAvailability && <Availability>{t('availability')({ days: availability })}</Availability>}
          </AvailabilityTextContainer>
          {hasAvailability && dueDate && <DueDateText>{t('dueDate')({ dueDate: formattedDueDate })}</DueDateText>}
        </ContentContainer>
      )}
    </Card>
  )
}

/*
 * PropTypes
 */

BalanceCard.propTypes = {
  availability: PropTypes.number.isRequired,
  dueDate: PropTypes.string.isRequired,
  onRechargePress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

BalanceCard.defaultProps = {
  loading: false,
}

/*
 * Styles
 */

const ContentContainer = styled(View)({
  marginVertical: 8,
})

const AvailabilityTextContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const AvailabilityDescription = styled(Text)({
  fontFamily: Fonts.palanquin.regular,
  color: Colors.NERO,
  fontSize: 20,
})

const Availability = styled(Text)({
  fontFamily: Fonts.palanquin.bold,
  color: Colors.NERO,
  fontSize: 24,
})

const DueDateText = styled(Text)({
  fontFamily: Fonts.palanquin.regular,
  color: Colors.NERO,
  fontSize: 12,
})

import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import { Card } from './Card'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'

export const WorkOrderCard = ({ workOrder }) => {
  const { t } = useTranslation('home')
  const { requestDate, timeSlot } = workOrder

  return (
    <Card
      title={t('workOrder.title')}
      titleColor={Colors.WHITE}
      icon={require('~/images/tecnico.png')}
      iconColor={Colors.WHITE}
      backgroundColor={Colors.LIGHT_BLUE_500}
      arrowColor={Colors.WHITE}
      collapsible
    >
      <WorkOrderText>{t('workOrder.description')({ requestDate, timeSlot })}</WorkOrderText>
    </Card>
  )
}

WorkOrderCard.propTypes = {
  workOrder: PropTypes.shape({
    id: PropTypes.string,
    requestDate: PropTypes.string.isRequired, // '2014-10-01T09:00:00'
    state: PropTypes.string, // 'AG- Agendada',
    address: PropTypes.string,
    timeSlot: {
      startDateTime: PropTypes.string.isRequired, // '2014-10-01T09:00:00',
      endDateTime: PropTypes.string.isRequired, // '2014-10-01T12:00:00',
    },
  }).isRequired,
}

const WorkOrderText = styled(Text)({
  fontFamily: Fonts.palanquin.regular,
  fontSize: 16,
  lineHeight: 24,
  color: Colors.WHITE,
})

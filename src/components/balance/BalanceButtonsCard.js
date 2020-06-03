import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import { Card } from '~/components/common/Card'
import { CompactButton } from '../common/CompactButton'

export const BalanceButtonsCard = ({ onSOSPress, onGiveMeBalancePress }) => {
  const { t } = useTranslation('balance')

  return (
    <Card icon={require('~/images/recarga.png')} title={t('rechargeOptions')}>
      <ButtonsContainer>
        <CompactButton
          iconSource={require('~/images/recarga.png')}
          text={t('buttons.SOS')}
          onPress={onSOSPress}
          outline
        />
        <ButtonSpacer />
        <CompactButton
          iconSource={require('~/images/recarga.png')}
          text={t('buttons.giveMeBalance')}
          onPress={onGiveMeBalancePress}
          outline
        />
      </ButtonsContainer>
    </Card>
  )
}

/*
 * PropTypes
 */

BalanceButtonsCard.propTypes = {
  onSOSPress: PropTypes.func.isRequired,
  onGiveMeBalancePress: PropTypes.func.isRequired,
}

/*
 * Styles
 */

const ButtonsContainer = styled(View)({
  marginVertical: 8,
})

const ButtonSpacer = styled(View)({
  height: 8,
})

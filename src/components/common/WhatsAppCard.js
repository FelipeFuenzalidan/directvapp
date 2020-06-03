import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import { Card } from './Card'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { Button } from './Button'

/**
 * Screen Codes Card Component
 */

export const WhatsAppCard = ({ onWhatsAppPress }) => {
  const { t } = useTranslation('help')

  return (
    <Card
      title={t('whatsApp.title')}
      icon={require('~/images/whatsapp-green.png')}
      footer={
        <Button text={t('whatsApp.buttonText')} onPress={onWhatsAppPress} backgroundColor={Colors.LIME_GREEN} compact />
      }
    >
      <DescriptionText>
        {`${t('whatsApp.description')} `}
        <BoldText>{t('whatsApp.phoneNumber')}</BoldText>
      </DescriptionText>
    </Card>
  )
}

/*
 * PropTypes
 */

WhatsAppCard.propTypes = {
  onWhatsAppPress: PropTypes.func.isRequired,
}

/*
 * Styles
 */

const DescriptionText = styled(Text)({
  color: Colors.BLACK,
  fontSize: 16,
  fontFamily: Fonts.palanquin.regular,
  lineHeight: 24,
})

const BoldText = styled(Text)({
  color: Colors.BLACK,
  fontSize: 16,
  fontFamily: Fonts.palanquin.bold,
  lineHeight: 24,
})

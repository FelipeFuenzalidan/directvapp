import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { isNil } from 'lodash'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { SectionHeader } from '~/components/common/SectionHeader'
import { ScreenCodesCard } from '~/components/screenCodes/ScreenCodesCard'
import { WhatsAppCard } from '~/components/common/WhatsAppCard'

export const HelpView = ({ onWhatsAppPress, onCommandPress, loading, delay, onProblemSolved }) => {
  const { t } = useTranslation('help')

  return (
    <Container>
      <SectionHeader title={t('title')} iconSource={require('~/images/ayuda.png')} />
      <ContentContainer>
        <ContentTitle>{t('contentTitle.tools')}</ContentTitle>
        <ScreenCodesCard
          loading={loading || !isNil(delay)}
          delay={delay}
          onCommandPress={onCommandPress}
          onProblemSolved={onProblemSolved}
        />
        <ContentTitle>{t('contentTitle.whatsApp')}</ContentTitle>
        <WhatsAppCard onWhatsAppPress={onWhatsAppPress} />
      </ContentContainer>
    </Container>
  )
}

/*
 * PropTypes
 */

HelpView.propTypes = {
  onWhatsAppPress: PropTypes.func.isRequired,
  onCommandPress: PropTypes.func.isRequired,
  onProblemSolved: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  delay: PropTypes.number,
}

HelpView.defaultProps = {
  loading: false,
  delay: null,
}

/*
 * Styles
 */

const Container = styled(View)({
  flex: 1,
  backgroundColor: Colors.LIGHT_GREY,
})

const ContentContainer = styled(ScrollView)({
  paddingHorizontal: 10,
})

const ContentTitle = styled(Text)({
  marginTop: 24,
  marginBottom: 8,
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 16,
  color: Colors.LIGHT_BLUE_900,
  textTransform: 'uppercase',
})

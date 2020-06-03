import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'

import { Card } from '../common/Card'
import { Colors } from '~/theme/Colors'
import { Fonts } from '~/theme/Fonts'
import { CodeButton } from './CodeButton'
import { SCREEN_CODES } from '~/constants/ScreenCodes'
import { RoundButton } from '../common/RoundButton'

/**
 * Screen Codes Card Component
 */

export const ScreenCodesCard = ({ loading, delay, onCommandPress, onProblemSolved }) => {
  const { t } = useTranslation('help')
  const [problemSolved, setProblemSolved] = useState(false)

  const commandSent = !isNil(delay) && delay <= 0

  const handleResponsePress = useCallback(() => {
    onProblemSolved(problemSolved)
    setProblemSolved(true)
    // TODO: do something
  }, [onProblemSolved, problemSolved])

  return (
    <Card
      title={t('errorExtensions.title')}
      icon={require('~/images/message-tv.png')}
      iconColor={Colors.LIGHT_BLUE_900}
    >
      <DescriptionText>{t('errorExtensions.description')}</DescriptionText>

      <ContentContainer>
        {SCREEN_CODES.map(code => {
          return (
            <CodeButton
              key={code.number}
              codeNumber={code.number}
              codeTitle={code.title}
              codeDescriptions={code.descriptions}
              codeButtonText={t('errorExtensions.buttonText')(code.number)}
              onPress={onCommandPress}
            />
          )
        })}
        {loading && (
          <LoadingContainer>
            {!commandSent && <LoadingText>{t('errorExtensions.actionDescription')}</LoadingText>}
            {commandSent && <LoadingText>{t('errorExtensions.responseActionDescription')}</LoadingText>}
            {!commandSent && <ActivityIndicator />}
            {!commandSent && <LoadingTextThin>{t('errorExtensions.minutes')}</LoadingTextThin>}
            {commandSent && (
              <ResponseContainer>
                <ResponseText>{t('errorExtensions.problemSolved')}</ResponseText>
                <ButtonContainer>
                  <RoundButton text="NO" onPress={handleResponsePress} buttonWidth={140} outline />
                  <RoundButton
                    text="SI"
                    onPress={handleResponsePress}
                    buttonWidth={140}
                    buttonColor={Colors.LIGHT_BLUE_900}
                  />
                </ButtonContainer>
              </ResponseContainer>
            )}
          </LoadingContainer>
        )}
      </ContentContainer>
    </Card>
  )
}

/*
 * PropTypes
 */

ScreenCodesCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  delay: PropTypes.bool.isRequired,
  onCommandPress: PropTypes.func.isRequired,
  onProblemSolved: PropTypes.func.isRequired,
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

const ContentContainer = styled(View)({
  position: 'relative',
})

const LoadingContainer = styled(View)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  flex: 1,
  padding: 16,
  borderRadius: 5,
  backgroundColor: Colors.INDIGO,
  alignItems: 'center',
  justifyContent: 'space-between',
})

const LoadingText = styled(Text)({
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 16,
  color: Colors.WHITE,
  textAlign: 'center',
  lineHeight: 25,
})

const LoadingTextThin = styled(Text)({
  fontFamily: Fonts.dtvcurve.regular,
  fontSize: 16,
  color: Colors.WHITE,
  textAlign: 'center',
  paddingBottom: 40,
})

const ResponseContainer = styled(View)({
  justifyContent: 'center',
})

const ResponseText = styled(Text)({
  fontFamily: Fonts.palanquin.medium,
  fontSize: 16,
  color: Colors.WHITE,
  textAlign: 'center',
})

const ButtonContainer = styled(View)({
  width: '100%',
  padding: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
})

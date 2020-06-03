import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Navigation } from 'react-native-navigation'
import styled, { ThemeProvider } from 'styled-components/native'
import { isNil, get } from 'lodash'

import { Fonts } from '~/theme/Fonts'
import { Colors } from '~/theme/Colors'
import { themes } from '~/theme/theme'
import { ErrorCodeButton } from '~/components/common/ErrorCodeButton'
import { sendCommand } from '~/api/commands'

const COMMANDS = [721, 722, 711]

let limitReached = false

const ErrorExtensionsScreen = ({ componentId }) => {
  const { t } = useTranslation('errorExtensions')
  const [commandBeingSent, setCommandBeingSent] = useState()

  const handleCommandRequestEnd = useCallback(() => setCommandBeingSent(null), [])
  const handleProblemSolved = useCallback(() => Navigation.dismissModal(componentId), [componentId])

  const allCommandsDisabled = !isNil(commandBeingSent) || limitReached

  return (
    <ThemeProvider theme={themes.post}>
      <Container>
        <Instructions>{limitReached ? t('limitReached') : t('instructions')}</Instructions>

        {COMMANDS.map(command => (
          <CommandButton
            key={command}
            command={command}
            disabled={allCommandsDisabled}
            onCommandRequestStart={setCommandBeingSent}
            onCommandRequestEnd={handleCommandRequestEnd}
            onProblemSolved={handleProblemSolved}
          />
        ))}

        <Instructions>{commandBeingSent && t('sendingCommand')({ command: commandBeingSent })}</Instructions>
      </Container>
    </ThemeProvider>
  )
}

/**
 * PropTypes
 */

ErrorExtensionsScreen.propTypes = {
  componentId: PropTypes.string.isRequired,
}

/**
 * Screen options
 */

ErrorExtensionsScreen.options = {
  topBar: {
    visible: false,
  },
}

/**
 * CommandButton
 */

const CommandButton = ({ command, onCommandRequestStart, onCommandRequestEnd, disabled, onProblemSolved }) => {
  const [loading, setLoading] = useState(false)

  const [delay, setDelay] = useState(0)
  const { t } = useTranslation('errorExtensions')

  const handleButtonPress = useCallback(async () => {
    try {
      onCommandRequestStart(command)
      setLoading(true)

      // TODO: cancel the request in effect cleanup
      const response = await sendCommand(command)

      const limitReachedError = get(response, 'result.code') === 'DTV-0001'
      if (limitReachedError) {
        limitReached = true
        Alert.alert(t('limitReachedErrorModal.title'), t('limitReachedErrorModal.subtitle'))
        return
      }

      setDelay(get(response, 'commandDelay.amount'))
    } catch (error) {
      Alert.alert(t('unexpectedErrorSendingCommand'))
    } finally {
      setLoading(false)
      onCommandRequestEnd(command)
    }
  }, [command, onCommandRequestStart, onCommandRequestEnd, t])

  const handleAnimationEnd = useCallback(
    finished => {
      setDelay(0)
      onCommandRequestStart(false)
      if (finished) {
        Alert.alert(t('commandSentModal.title'), t('commandSentModal.title'), [
          { style: 'default', text: t('commandSentModal.buttons.no') },
          { style: 'default', text: t('commandSentModal.buttons.yes'), onPress: onProblemSolved },
        ])
      } else {
        Alert.alert(t('commandBeingSentModal.title'), t('commandBeingSentModal.subtitle')({ seconds: delay / 1000 }))
      }
    },
    [t, delay, onCommandRequestStart, onProblemSolved]
  )

  const waiting = delay > 0
  const isDisabled = disabled || loading

  return (
    <ErrorCodeButton
      errorCode={t(`_${command}`)}
      onPress={handleButtonPress}
      onAnimationEnd={handleAnimationEnd}
      animationDuration={delay}
      isDisabled={isDisabled}
      isWaiting={waiting}
      isLoading={loading}
    />
  )
}

/*
 * CommandButton PropTypes
 */
CommandButton.propTypes = {
  command: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onCommandRequestStart: PropTypes.func.isRequired,
  onCommandRequestEnd: PropTypes.func.isRequired,
  onProblemSolved: PropTypes.func.isRequired,
}

CommandButton.defaultProps = {
  disabled: false,
}

/*
 * Styles
 */

const Container = styled(SafeAreaView)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.WHITE,
})

const Instructions = styled(Text)({
  marginHorizontal: 30,
  marginVertical: 10,
  minHeight: 100,
  textAlign: 'center',
  justifyContent: 'center',
  fontFamily: Fonts.dtvcurve.medium,
  fontSize: 20,
  color: props => props.theme.primary,
})

export default ErrorExtensionsScreen

import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'

import { get } from 'lodash'
import { useTranslation } from 'react-i18next'

import { openWhatsappWithText, Keywords } from '~/lib/whatsapp'
import { HelpView } from '~/views/HelpView'
import { sendCommand } from '~/api/commands'

const HelpScreen = () => {
  const { t } = useTranslation('errorExtensions')

  const [loading, setLoading] = useState(false)
  const [delay, setDelay] = useState(null)

  const handleCommandPress = useCallback(
    async codeNumber => {
      try {
        setDelay(null)
        setLoading(true)

        // TODO: cancel the request in effect cleanup
        const response = await sendCommand(codeNumber)

        const limitReachedError = get(response, 'result.code') === 'DTV-0001'
        if (limitReachedError) {
          Alert.alert(t('limitReachedErrorModal.title'), t('limitReachedErrorModal.subtitle'))
          return
        }

        const delayInMs = get(response, 'commandDelay.amount')
        setDelay(delayInMs)
        // TODO: use countdown to decrement delay each second
        setTimeout(() => setDelay(0), delayInMs)
      } catch (error) {
        Alert.alert(t('unexpectedErrorSendingCommand'))
      } finally {
        setLoading(false)
      }
    },
    [t]
  )

  const handleProblemSolved = useCallback(() => {
    setLoading(false)
    setDelay(null)
  }, [])

  return (
    <HelpView
      onWhatsAppPress={() => openWhatsappWithText(Keywords.CSRDIGITAL)}
      onCommandPress={handleCommandPress}
      onProblemSolved={handleProblemSolved}
      loading={loading}
      delay={delay}
    />
  )
}

export default HelpScreen

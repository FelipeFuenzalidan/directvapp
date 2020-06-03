import React, { useCallback, useMemo } from 'react'
import { Alert } from 'react-native'

import { BalanceView } from '~/views/BalanceView'
import { useBalance } from '~/hooks/balance'
import { useLoggedUser } from '~/hooks/auth'
import { openRechargeWeb } from '~/lib/external-links'

const BalanceScreen = () => {
  const { daysToDisconnectionDate, disconnectionDate, fetching, refetch } = useBalance()
  const { user } = useLoggedUser()

  const balanceData = useMemo(() => {
    return {
      availability: daysToDisconnectionDate,
      dueDate: disconnectionDate,
    }
  }, [daysToDisconnectionDate, disconnectionDate])

  const handleRechargePress = useCallback(() => {
    if (user?.smartCard?.id) {
      openRechargeWeb(user.smartCard.id)
    }
  }, [user])

  const handleSOSPress = useCallback(() => {
    Alert.alert('TODO: Implementar Recarga SOS')
  }, [])

  const handleGiveMeBalancePress = useCallback(() => {
    Alert.alert('TODO: Implementar Dame Saldo')
  }, [])

  return (
    <BalanceView
      fetching={fetching}
      cardNumber={user?.smartCard?.id}
      data={balanceData}
      onRechargePress={handleRechargePress}
      onPullToRefresh={refetch}
      onSOSPress={handleSOSPress}
      onGiveMeBalancePress={handleGiveMeBalancePress}
    />
  )
}

export default BalanceScreen

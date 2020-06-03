import { useState, useCallback, useEffect, useMemo } from 'react'
import { getBalance } from '~/api/balance'
import { useLoggedUser } from './auth'

// The customer data is requested one time, unless refetch is called
let balancePromise

export function useBalance() {
  const [balanceData, setBalanceData] = useState(null)
  const [fetching, setFetching] = useState(null)
  const [hasError, setHasError] = useState(null)

  const { isPrePaid } = useLoggedUser()

  const fetchBalance = useCallback(async () => {
    if (isPrePaid) {
      setFetching(true)
      setHasError(false)
      try {
        if (!balancePromise) {
          balancePromise = getBalance()
        }
        setBalanceData(await balancePromise)
      } catch (error) {
        setHasError(true)
      } finally {
        setFetching(false)
      }
    }
  }, [isPrePaid])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  const refetch = useCallback(async () => {
    balancePromise = getBalance()
    return fetchBalance()
  }, [fetchBalance])

  const data = useMemo(() => {
    if (!balanceData) {
      return {}
    }

    const {
      balance: { amount },
      daysToDisconnectionDate,
      disconnectionDate,
    } = balanceData

    return {
      balance: { amount },
      daysToDisconnectionDate,
      disconnectionDate,
    }
  }, [balanceData])

  return { ...data, fetching, hasError, refetch }
}

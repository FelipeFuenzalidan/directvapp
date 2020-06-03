import { useState, useEffect, useMemo, useCallback } from 'react'
import { isEmpty } from 'lodash'
import { getUserData } from '~/api/auth'

const CustomerType = {
  PRE_PAID: '1',
  POST_PAID: '2',
}

const PaymentMethod = {
  INVOICE: 'INVOICE',
}

// The customer data is requested one time, unless refetch is called
let loggedUserPromise = getUserData()

export function useLoggedUser() {
  const [user, setUser] = useState(null)
  const [fetching, setFetching] = useState(null)

  const fetchUserData = useCallback(async () => {
    setFetching(true)
    try {
      const userData = await loggedUserPromise
      setUser(userData)

      return { isPrePaid: userData?.type === CustomerType.PRE_PAID }
    } catch (error) {
      // TODO: set error?
      setUser(null)

      throw error
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const refetch = useCallback(async () => {
    loggedUserPromise = getUserData()
    return fetchUserData()
  }, [fetchUserData])

  const isLogged = !isEmpty(user)
  const isPrePaid = useMemo(() => user?.type === CustomerType.PRE_PAID, [user])
  const isPostPaid = useMemo(() => user?.type === CustomerType.POST_PAID, [user])
  const hasAutomaticDebit = useMemo(() => user?.paymentMethod !== PaymentMethod.INVOICE, [user])

  return { user, isLogged, fetching, refetch, isPrePaid, isPostPaid, hasAutomaticDebit }
}

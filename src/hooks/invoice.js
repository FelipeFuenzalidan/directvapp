import { useState, useCallback, useEffect } from 'react'

import { useLoggedUser } from '~/hooks/auth'
import { getInvoice } from '~/api/invoice'

export function useLastInvoice() {
  const [invoice, setInvoice] = useState(null)
  const [fetching, setFetching] = useState(null)
  const [hasError, setHasError] = useState(null)

  const { user } = useLoggedUser()

  const fetchLastInvoice = useCallback(async () => {
    if (user?.invoice?.number) {
      setFetching(true)
      setHasError(false)
      try {
        const lastInvoice = await getInvoice(user.invoice.number)
        setInvoice(lastInvoice)
      } catch (error) {
        setHasError(true)
      } finally {
        setFetching(false)
      }
    }
  }, [user])

  useEffect(() => {
    fetchLastInvoice()
  }, [fetchLastInvoice])

  return { invoice, fetching, hasError, refetch: fetchLastInvoice }
}

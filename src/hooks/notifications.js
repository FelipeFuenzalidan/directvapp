import { useCallback, useMemo } from 'react'
import { isEmpty } from 'lodash'
import useSWR from 'swr'

import { markAsRead } from '~/api/notifications'
import { apiClient } from '~/lib/api-client'
import { useAppState } from './utils'

export function useNotifications() {
  const { data, isValidating, error, revalidate, mutate } = useSWR('/NotificationsManager/notifications', apiClient.get)
  useAppState({ onForeground: revalidate })

  const notifications = useMemo(() => data?.data?.items, [data])
  const unreadCount = useMemo(() => data?.data?.unreadCount, [data])
  const fetching = !notifications && isValidating
  const refetching = notifications && isValidating
  const hasError = !!error
  const refetch = revalidate

  const markAllAsRead = useCallback(async () => {
    if (!isEmpty(notifications)) {
      mutate(original => ({ data: { ...original.data, unreadCount: 0 } }), true)
      await markAsRead(notifications[0].id)
    }
  }, [notifications, mutate])

  return { notifications, unreadCount, fetching, refetching, hasError, refetch, markAllAsRead }
}

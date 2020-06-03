import { apiClient } from '~/lib/api-client'

export async function getNotifications() {
  const { data } = await apiClient.get(`/NotificationsManager/notifications`)
  return data
}

export async function markAsRead(lastNotificationId) {
  const payload = { lastNotificationId }
  return apiClient.post(`/NotificationsManager/markAsRead`, payload)
}

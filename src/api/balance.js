import { apiClient } from '~/lib/api-client'

export async function getBalance() {
  const { data } = await apiClient.get(`/BillingManagement/balance`)

  return data.balance
}

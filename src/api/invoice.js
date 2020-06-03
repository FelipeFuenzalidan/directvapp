import { apiClient } from '~/lib/api-client'

export async function getInvoice(invoiceId) {
  const { data } = await apiClient.get(
    `/AccountManagement/GetCustomerFinancialTransactionsByCriteria/invoice/${invoiceId}`
  )

  return data
}

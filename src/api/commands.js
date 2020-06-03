import { apiClient } from '~/lib/api-client'

export async function sendCommand(command) {
  const { data } = await apiClient.get(`/ServiceProblemManagement/ReasingOrReconfigureFailedServices/${command}`)
  return data
}

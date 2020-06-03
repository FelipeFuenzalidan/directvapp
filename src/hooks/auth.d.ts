import { Customer } from '~/api/auth'

export function useLoggedUser(): {
  user?: Customer
  isLogged: boolean
  fetching: boolean
  isPrePaid: boolean
  isPostPaid: boolean
  hasAutomaticDebit: boolean
  refetch: () => { isPrePaid: boolean }
}

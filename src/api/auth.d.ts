enum PaymentMethod {
  INVOICE = 'INVOICE',
}

type ISODateString = string

type WorkOrder = {
  id: string
  requestDate: ISODateString
  state: string
  address: string
  timeSlot?: {
    startDateTime: ISODateString
    endDateTime: ISODateString
  }
}

export type Customer = {
  type: string
  typeDescription: string
  name: {
    first: string
    last: string
  }
  id: string
  paymentMethod: PaymentMethod
  invoice: {
    number: string
    dueDate: ISODateString
    totalAmount: number
    balance: number
    isPayed: boolean
  }
  product: {
    plan: string
  }
  smartCard: {
    id: string
  }
  workOrders: WorkOrder[]
}

export function getUserData(): Promise<Customer>

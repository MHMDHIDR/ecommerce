import { StatusChangeProps } from '@/types'
import { parseJson } from './jsonTools'

export const handleStatusChange = ({
  productItems,
  id,
  newStatus,
  rejectReason,
  itemId
}: StatusChangeProps) => {
  return {
    ...productItems,
    [id]: {
      items: productItems[id].items.map((item: any) => {
        if (item.id === itemId) {
          return {
            ...item,
            itemStatus: newStatus,
            rejectReason: rejectReason ? rejectReason : ''
          }
        }
        return item
      }),
      orderStatus: productItems[id].orderStatus
    }
  }
}

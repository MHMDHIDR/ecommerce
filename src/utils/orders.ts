import { StatusChangeProps, SupplierOrders } from '@/types'

export function groupItemsBySupplier(items: any[]): SupplierOrders {
  const supplierOrders: SupplierOrders = {}

  items.forEach(item => {
    const { addedById } = item
    if (!supplierOrders[addedById]) {
      supplierOrders[addedById] = { items: [], orderStatus: 'pending' }
    }
    item.itemStatus = 'pending' // Add default itemStatus property to item
    supplierOrders[addedById].items.push(item)
  })

  return supplierOrders
}

export const handleStatusChange = ({
  productItems,
  id,
  newStatus,
  itemId
}: StatusChangeProps) => {
  return {
    ...productItems,
    [id]: {
      items: productItems[id].items.map((item: any) => {
        if (item.id === itemId) {
          return {
            ...item,
            itemStatus: newStatus
          }
        }
        return item
      }),
      orderStatus: productItems[id].orderStatus
    }
  }
}

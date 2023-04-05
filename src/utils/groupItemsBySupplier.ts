type SupplierOrders = {
  [key: string]: { items: any[]; orderStatus: string }
}

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

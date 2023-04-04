interface SupplierOrders {
  [key: string]: { items: any[] }
}

export function groupItemsBySupplier(items: any[]): SupplierOrders {
  const supplierOrders: SupplierOrders = {}

  items.forEach(item => {
    const { addedById } = item
    if (!supplierOrders[addedById]) {
      supplierOrders[addedById] = { items: [] }
    }
    supplierOrders[addedById].items.push(item)
  })

  return supplierOrders
}

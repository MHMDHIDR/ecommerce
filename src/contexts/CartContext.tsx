import { createContext, FC, ReactNode, useContext, useEffect, useReducer } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Actions, CartProviderState, Item } from '@/types'

export const initialState: any = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  cartTotal: 0
}

const CartContext = createContext<CartProviderState | undefined>(initialState)

export const createCartIdentifier = (len = 12) =>
  [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join('')

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) throw new Error('Expected to be wrapped in a CartProvider')

  return context
}

function reducer(state: CartProviderState, action: Actions) {
  switch (action.type) {
    case 'SET_ITEMS':
      return generateCartState(state, action.payload)

    case 'ADD_ITEM': {
      const items = [...state.items, action.payload]

      return generateCartState(state, items)
    }

    case 'UPDATE_ITEM': {
      const items = state.items.map((item: Item) => {
        if (item.id !== action.id) return item

        return {
          ...item,
          ...action.payload
        }
      })

      return generateCartState(state, items)
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter((i: Item) => i.id !== action.id)

      return generateCartState(state, items)
    }

    case 'EMPTY_CART':
      return initialState

    default:
      throw new Error('No action specified')
  }
}

const generateCartState = (state = initialState, items: Item[]) => {
  const totalUniqueItems = calculateUniqueItems(items)
  const isEmpty = totalUniqueItems === 0

  return {
    ...initialState,
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    totalUniqueItems,
    cartTotal: calculateTotal(items),
    isEmpty
  }
}

const calculateItemTotals = (items: Item[]) =>
  items.map(item => ({
    ...item,
    itemTotal: item.currentPrice * item.quantity!
  }))

const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + item.quantity! * item.currentPrice, 0)

const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0)

const calculateUniqueItems = (items: Item[]) => items.length

export const CartProvider: FC<{
  children?: ReactNode
  id?: string
  defaultItems?: Item[]
  onSetItems?: (items: Item[]) => void
  onItemAdd?: (payload: Item) => void
  onItemUpdate?: (payload: object) => void
  onItemRemove?: (id: Item['id']) => void
  storage?: (
    key: string,
    initialValue: string
  ) => [string, (value: Function | string) => void]
}> = ({
  children,
  id: cartId,
  defaultItems = [],
  onSetItems,
  onItemAdd,
  onItemUpdate,
  onItemRemove,
  storage = useLocalStorage
}) => {
  const id = cartId ? cartId : createCartIdentifier()

  const [savedCart, saveCart] = storage(
    cartId ? `react-use-cart-${id}` : `react-use-cart`,
    JSON.stringify({
      id,
      ...initialState,
      items: defaultItems
    })
  )

  const [state, dispatch] = useReducer(reducer, JSON.parse(savedCart))
  useEffect(() => {
    saveCart(JSON.stringify(state))
  }, [state, saveCart])

  const setItems = (items: Item[]) => {
    dispatch({
      type: 'SET_ITEMS',
      payload: items.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }))
    })

    onSetItems && onSetItems(items)
  }

  const addItem = (item: Item, quantity = 1) => {
    if (!item.id) throw new Error('You must provide an `id` for items')
    if (quantity <= 0) return

    const currentItem = state.items.find((i: Item) => i.id === item.id)

    if (!currentItem && !item.hasOwnProperty('currentPrice'))
      throw new Error('You must pass a `currentPrice property` for new items')

    if (!currentItem) {
      const payload = { ...item, quantity }

      dispatch({ type: 'ADD_ITEM', payload })

      onItemAdd && onItemAdd(payload)

      return
    }

    const payload = { ...item, quantity: currentItem.quantity + quantity }

    dispatch({
      type: 'UPDATE_ITEM',
      id: item.id,
      payload
    })

    onItemUpdate && onItemUpdate(payload)
  }

  const updateItem = (id: Item['id'], payload: object) => {
    if (!id || !payload) {
      return
    }

    dispatch({ type: 'UPDATE_ITEM', id, payload })

    onItemUpdate && onItemUpdate(payload)
  }

  const updateItemQuantity = (id: Item['id'], quantity: number) => {
    if (quantity <= 0) {
      onItemRemove && onItemRemove(id)

      dispatch({ type: 'REMOVE_ITEM', id })

      return
    }

    const currentItem = state.items.find((item: Item) => item.id === id)

    if (!currentItem) throw new Error('No such item to update')

    const payload = { ...currentItem, quantity }

    dispatch({
      type: 'UPDATE_ITEM',
      id,
      payload
    })

    onItemUpdate && onItemUpdate(payload)
  }

  const removeItem = (id: Item['id']) => {
    if (!id) return

    dispatch({ type: 'REMOVE_ITEM', id })

    onItemRemove && onItemRemove(id)
  }

  const emptyCart = () =>
    dispatch({
      type: 'EMPTY_CART'
    })

  const getItem = (id: Item['id']) => state.items.find((i: Item) => i.id === id)

  const inCart = (id: Item['id']) => state.items.some((i: Item) => i.id === id)

  return (
    <CartContext.Provider
      value={{
        ...state,
        getItem,
        inCart,
        setItems,
        addItem,
        updateItem,
        updateItemQuantity,
        removeItem,
        emptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

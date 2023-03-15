import { MAX_QUANTITY } from '../../constants'
import { useCart } from '../../contexts/CartContext'
import { AddBtn, MinusBtn, TrashBtn } from '../../components/Icons/ControlBtn'
import { Item } from '../../types'

const Controls = ({ item }: { item: Item }) => {
  const { removeItem, updateItemQuantity } = useCart()

  return (
    <div className='flex items-center gap-x-1 mt-1.5'>
      <TrashBtn
        className='w-4 h-4 fill-red-600 dark:fill-red-400'
        onClick={() => removeItem(item.id)}
      />
      <div className='flex items-center justify-around w-24 bg-gray-100 dark:bg-gray-900 py-0.5 px-3 rounded-full'>
        <AddBtn
          className='w-2.5 h-2.5'
          onClick={() =>
            updateItemQuantity(
              item.id,
              item.quantity < MAX_QUANTITY ? item.quantity + 1 : item.quantity
            )
          }
        />
        <input
          className='text-center w-6 bg-gray-100 dark:bg-gray-900'
          type='number'
          value={item.quantity}
          min={1}
          max={MAX_QUANTITY}
          onChange={e => updateItemQuantity(item.id, parseInt(e.target.value))}
        />
        <MinusBtn
          className='w-2.5 h-2.5'
          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
        />
      </div>
    </div>
  )
}
export default Controls

import { MAX_QUANTITY } from '@/constants'
import { useCart } from '@/contexts/CartContext'
import { AddBtn, MinusBtn, TrashBtn } from '@/components/Icons/ControlBtn'
import { Item } from '@/types'

const Controls = ({ item }: { item: Item }) => {
  const { removeItem, updateItemQuantity } = useCart()

  return (
    <div className='flex items-center gap-x-1 cursor-pointer'>
      <TrashBtn
        className='w-5 h-5 fill-red-600 dark:fill-red-400'
        onClick={() => removeItem(item.id)}
      />
      <div className='flex items-center justify-between bg-gray-100 dark:bg-gray-900 rounded-full py-1'>
        <AddBtn
          className='p-2 rounded-r-full w-8 h-8'
          onClick={() =>
            updateItemQuantity(
              item.id,
              item.quantity < MAX_QUANTITY ? item.quantity + 1 : item.quantity
            )
          }
        />
        <input
          className='text-center px-2 w-14 bg-gray-100 dark:bg-gray-900 text-xl'
          type='number'
          value={item.quantity}
          min={1}
          max={MAX_QUANTITY}
          onChange={e => updateItemQuantity(item.id, parseInt(e.target.value))}
        />
        <MinusBtn
          className='p-2 rounded-l-full w-8 h-8'
          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
        />
      </div>
    </div>
  )
}
export default Controls

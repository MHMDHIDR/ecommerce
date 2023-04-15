import { Link } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { CartIconFilled } from './Icons/CartIcon'

const CartNavLink = () => {
  const { totalUniqueItems } = useCart()

  return (
    <Link
      to={'/cart'}
      type='button'
      aria-controls='navbar'
      aria-expanded='false'
      aria-label='Toggle navigation'
      className={`inline-block text-sm text-black rounded-full relative`}
    >
      <div className='flex justify-center items-center md:bg-white md:dark:bg-gray-900 bg-opacity-30 -mr-4 px-3 py-1 rounded-full'>
        <span className='bg-black dark:bg-gray-300 p-2 rounded-full'>
          <CartIconFilled className='w-4 h-4 fill-gray-50 dark:fill-neutral-900' />
        </span>
        <span className='px-2 dark:text-gray-50'>السلة</span>
      </div>
      <span className='absolute -top-1 left-1.5 rounded-full bg-red-700 px-1.5 text-xs text-white'>
        {totalUniqueItems}
      </span>
    </Link>
  )
}
export default CartNavLink

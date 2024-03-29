import { Link } from 'react-router-dom'
import { isActiveLink } from '@/utils/isActiveLink'

const CartHeader = ({ id }: { id: string }) => {
  return id ? (
    <header className='flex justify-between my-4'>
      <span className='font-bold'>طلباتي</span>
      <div className='flex gap-x-2'>
        <Link
          to={`/cart`}
          className={`border border-gray-200 px-2 py-1 text-sm rounded-lg${
            isActiveLink('/cart')
              ? ' bg-gray-100 text-gray-800'
              : ' text-gray-700 dark:text-gray-300'
          }`}
        >
          تحت الاجراء
        </Link>
        <Link
          to={`/completed-orders`}
          className={`border border-gray-200 px-2 py-1 text-sm rounded-lg${
            isActiveLink('/completed-orders')
              ? ' bg-gray-100 text-gray-800'
              : ' text-gray-700 dark:text-gray-300'
          }`}
        >
          مكتملة
        </Link>
      </div>
    </header>
  ) : null //if there's no currently logged in user then don't show the cartHeader
}
export default CartHeader

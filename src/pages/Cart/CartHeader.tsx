import { Link } from 'react-router-dom'
import { isActiveLink } from '../../utils/functions/isActiveLink'

const CartHeader = () => (
  <header className='flex justify-between my-4'>
    <span className='font-bold'>طلباتي</span>
    <div className='flex gap-x-2'>
      <Link
        to={`/cart`}
        className={`border border-gray-200 px-2 py-1 text-sm rounded-lg${
          isActiveLink('/cart') ? ' bg-black text-white' : ' text-gray-700'
        }`}
      >
        تحت الاجراء
      </Link>
      <Link
        to={`/completed-orders`}
        className={`border border-gray-200 px-2 py-1 text-sm rounded-lg${
          isActiveLink('/completed-orders') ? ' bg-black text-white' : ' text-gray-700'
        }`}
      >
        مكتملة
      </Link>
    </div>
  </header>
)
export default CartHeader

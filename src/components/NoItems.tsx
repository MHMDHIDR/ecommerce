import { Link } from 'react-router-dom'
import { NoItemsProps } from '@/types'
import EmptyCart from './Icons/EmptyCart'

const NoItems = ({ icon, msg, links, className }: NoItemsProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-6${
      className ? ' ' + className : ''
    }`}
  >
    <div className='flex flex-col justify-center items-center gap-6 max-w-lg my-2 text-lg font-bold leading-10 tracking-wider text-red-500'>
      {icon ? icon : <EmptyCart />}
      <p className='text-center'>{msg ? msg : `عفواً! السلة فارغة`}</p>
    </div>
    <div className='flex gap-3'>
      {links?.map(({ to, label }: { to: string; label: string }, idx) => (
        <Link
          key={idx}
          to={to}
          className='px-3 py-1 text-gray-800 transition-colors bg-gray-100 border border-gray-700 rounded hover:bg-gray-200'
        >
          {label}
        </Link>
      ))}
    </div>
  </div>
)

export default NoItems

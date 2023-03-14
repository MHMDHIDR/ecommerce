import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import HomeIcon from './Icons/HomeIcon'
import { CartIconFilled } from './Icons/CartIcon'
import NotificationsIcon from './Icons/NotificationsIcon'
import { isActiveLink } from '../utils/functions/isActiveLink'

const Footer = () => {
  const { totalUniqueItems } = useCart()

  const Menus = [
    {
      label: 'الرئيسية',
      to: '/',
      icon: HomeIcon
    },
    {
      label: 'السلة',
      to: '/cart',
      icon: CartIconFilled,
      totalUniqueItems
    },
    {
      label: 'الإشعارات',
      to: '/notifications',
      icon: NotificationsIcon
    },
    {
      label: 'الحساب',
      to: '/profile',
      icon: () => (
        <img
          src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
          width={16}
          height={16}
          className='rounded-full w-4 h-4'
          alt='Profile'
          loading='lazy'
        />
      )
    }
  ]

  return (
    <footer className='fixed flex-no-wrap -bottom-1 rounded-tl-3xl rounded-tr-3xl flex w-full py-3 lg:flex-wrap lg:justify-start dark:shadow-[0_-1px_7px_0_rgb(10_10_10_/_30%)] shadow-[0_-1px_7px_0_rgb(97_97_97_/_30%)] bg-gray-100 dark:bg-gray-700 transition-colors px-6 md:px-10 lg:px-20 bg-opacity-50 backdrop-blur-sm saturate-[180%] rtl'>
      <menu className='flex items-center gap-8 w-full justify-around'>
        {Menus.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            type='button'
            aria-controls='navbar'
            aria-expanded='false'
            aria-label='Toggle navigation'
            className={`text-sm text-black rounded-full relative flex`}
          >
            {isActiveLink(item.to) ? (
              <div className='flex items-center'>
                <span className='bg-black dark:bg-gray-300 p-2 rounded-full'>
                  <item.icon className='w-4 h-4 fill-gray-50 dark:fill-neutral-900' />
                </span>
                <span className='px-2 dark:text-gray-50'>{item.label}</span>
              </div>
            ) : (
              <span className='[&>svg]:w-5 inline-block py-1.5'>
                <item.icon className='w-5 h-5' />
              </span>
            )}
            {item.totalUniqueItems ? (
              <span className='absolute -top-2 right-2 rounded-full bg-red-700 py-0 px-1.5 text-xs text-white'>
                {item.totalUniqueItems}
              </span>
            ) : null}
          </Link>
        ))}
      </menu>
    </footer>
  )
}

export default Footer

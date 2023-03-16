import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { AppSettingsContext } from '../contexts/AppSettingsContext'
import HomeIcon from './Icons/HomeIcon'
import { CartIconFilled } from './Icons/CartIcon'
import NotificationsIcon from './Icons/NotificationsIcon'
import { isActiveLink } from '../utils/functions/isActiveLink'
import { isSmallScreen } from '../constants'
import Logo from './Icons/Logo'
import { AppSettingsProps } from '../types'
import Overlay from './Overlay'

const Footer = () => {
  const { isSidebarOpen, menuToggler } = useContext<AppSettingsProps>(AppSettingsContext)
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
    <>
      <Overlay />
      <footer
        className={`fixed flex-no-wrap -bottom-1 rounded-tl-3xl rounded-tr-3xl flex w-full z-50 rtl
      py-3 dark:shadow-[0_-1px_7px_0_rgb(10_10_10_/_30%)] shadow-[0_-1px_7px_0_rgb(97_97_97_/_30%)]
    bg-gray-100 dark:bg-gray-700 transition-all duration-500 px-6 bg-opacity-50 backdrop-blur-sm saturate-[180%]
      md:rounded-none md:w-fit md:px-10 md:h-screen md:bg-opacity-80 ${
        isSidebarOpen ? 'md:right-0' : 'md:-right-full'
      }
      lg:flex-wrap lg:justify-start lg:px-20
    `}
      >
        <menu className='flex md:flex-col items-center gap-8 md:gap-12 w-full md:justify-start md:pt-40 justify-around'>
          {!isSmallScreen && <Logo width='24' height='20' />}
          {Menus.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              type='button'
              aria-controls='navbar'
              aria-expanded='false'
              aria-label='Toggle navigation'
              className={`text-sm text-black rounded-full relative flex`}
              onClick={menuToggler}
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
    </>
  )
}

export default Footer

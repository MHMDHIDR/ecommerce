import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import HomeIcon from './Icons/HomeIcon'
import { CartIconFilled } from './Icons/CartIcon'
import NotificationsIcon from './Icons/NotificationsIcon'
import { AddBtn } from './Icons/ControlBtn'
import Logo from './Icons/Logo'
import Shop from './Icons/Shop'
import Catetory from './Icons/Catetory'
import { isActiveLink } from '@/utils/isActiveLink'
import { isSmallScreen, USER_DATA } from '@/constants'
import UsersIcon from './Icons/UsersIcon'
import { AppSettingsProps } from '@/types'
import Overlay from './Overlay'
import useAuth from '@/hooks/useAuth'

const Menu = () => {
  const { isSidebarOpen, menuToggler } = useContext<AppSettingsProps>(AppSettingsContext)
  const { totalUniqueItems } = useCart()
  const { pathname } = useLocation()
  const { userData, isAuth } = useAuth()
  const { id, username, avatarUrl, type } = userData || USER_DATA

  const Menu = [
    {
      label: 'الرئيسية',
      to: '/',
      icon: HomeIcon
    },
    {
      label: type === 'admin' || type === 'supplier' ? 'طلبات العملاء' : 'السلة',
      to: type === 'admin' ? '/dashboard' : type === 'supplier' ? '/supplier' : '/cart',
      icon: CartIconFilled,
      totalUniqueItems: type === 'admin' || type === 'supplier' ? null : totalUniqueItems
    },
    {
      label: 'الإشعارات',
      to: '/notifications',
      icon: NotificationsIcon
    },
    {
      label: 'الحساب',
      to: !id ? '/login' : '/profile',
      icon: () => {
        return isAuth ? (
          <img
            src={avatarUrl}
            width={16}
            height={16}
            className='rounded-full w-4 h-4'
            alt={`${username} Profile`}
            loading='lazy'
          />
        ) : (
          <UsersIcon className='border rounded-full p-1 h-4 w-4 hover:border-black transition-colors duration-300' />
        )
      }
    }
  ]

  const SupplierMenu = [
    {
      label: 'الطلبات',
      to: '/supplier',
      icon: CartIconFilled
    },
    {
      label: 'إضافة منتج',
      to: '/supplier/add',
      icon: AddBtn
    },
    {
      label: 'عرض المنتجات',
      to: '/supplier/products',
      icon: Shop
    },
    {
      label: 'التصنيفات',
      to: '/supplier/categories',
      icon: Catetory
    },
    {
      label: 'الحساب',
      to: !id ? '/login' : '/profile',
      icon: () => {
        return isAuth ? (
          <img
            src={avatarUrl}
            width={16}
            height={16}
            className='rounded-full w-4 h-4'
            alt={`${username} Profile`}
            loading='lazy'
          />
        ) : (
          <UsersIcon className='border rounded-full p-1 h-4 w-4 hover:border-black transition-colors duration-300' />
        )
      }
    }
  ]

  const DashboardMenu = [
    {
      label: 'الطلبات',
      to: '/dashboard',
      icon: CartIconFilled
    },
    {
      label: 'إضافة منتج',
      to: '/dashboard/add',
      icon: AddBtn
    },
    {
      label: 'عرض المنتجات',
      to: '/dashboard/products',
      icon: Shop
    },
    {
      label: 'التصنيفات',
      to: '/dashboard/categories',
      icon: Catetory
    },
    {
      label: 'المستخدمين',
      to: '/dashboard/users',
      icon: UsersIcon
    },
    {
      label: 'الحساب',
      to: !id ? '/login' : '/profile',
      icon: () => {
        return isAuth ? (
          <img
            src={avatarUrl}
            width={16}
            height={16}
            className='rounded-full w-4 h-4'
            alt={`${username} Profile`}
            loading='lazy'
          />
        ) : (
          <UsersIcon className='border rounded-full p-1 h-4 w-4 hover:border-black transition-colors duration-300' />
        )
      }
    }
  ]

  return (
    <>
      {!isSmallScreen && <Overlay />}
      <section
        className={`fixed flex-no-wrap -bottom-1 rounded-tl-3xl rounded-tr-3xl flex w-full z-50 rtl
      py-3 dark:shadow-[0_-1px_7px_0_rgb(10_10_10_/_30%)] shadow-[0_-1px_7px_0_rgb(97_97_97_/_30%)]
    bg-gray-100 dark:bg-gray-700 transition-all duration-500 px-6 bg-opacity-50 backdrop-blur-sm saturate-[180%]
      md:rounded-none md:w-fit md:px-10 md:h-screen md:bg-opacity-80 ${
        isSidebarOpen ? 'md:right-0' : 'md:-right-full'
      }
      lg:flex-wrap lg:justify-start lg:px-12
    `}
      >
        <menu className='flex md:flex-col items-center md:items-start md:gap-16 w-full justify-around md:justify-center'>
          {!isSmallScreen && (
            <Link to='/' onClick={menuToggler}>
              <Logo width='24' height='20' />
            </Link>
          )}
          {pathname.includes('supplier')
            ? SupplierMenu.map((item, idx) => (
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
                    <div className='flex justify-center items-center md:bg-white md:dark:bg-gray-900 bg-opacity-30 -mr-4 px-3 py-1 rounded-full'>
                      <span className='bg-black dark:bg-gray-300 p-2 rounded-full'>
                        <item.icon className='w-4 h-4 fill-gray-50 dark:fill-neutral-900' />
                      </span>
                      {!isSmallScreen ? (
                        <span className='px-2 dark:text-gray-50'>{item.label}</span>
                      ) : null}
                    </div>
                  ) : (
                    <div className='flex justify-center items-center'>
                      <span className='[&>svg]:w-5 inline-block py-1.5'>
                        <item.icon className='w-5 h-5' />
                      </span>
                      {!isSmallScreen ? (
                        <span className='px-2 dark:text-gray-50'>{item.label}</span>
                      ) : null}
                    </div>
                  )}
                </Link>
              ))
            : pathname.includes('dashboard')
            ? DashboardMenu.map((item, idx) => (
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
                    <div className='flex justify-center items-center md:bg-white md:dark:bg-gray-900 bg-opacity-30 -mr-4 px-3 py-1 rounded-full'>
                      <span className='bg-black dark:bg-gray-300 p-2 rounded-full'>
                        <item.icon className='w-4 h-4 fill-gray-50 dark:fill-neutral-900' />
                      </span>
                      {!isSmallScreen ? (
                        <span className='px-2 dark:text-gray-50'>{item.label}</span>
                      ) : null}
                    </div>
                  ) : (
                    <div className='flex justify-center items-center'>
                      <span className='[&>svg]:w-5 inline-block py-1.5'>
                        <item.icon className='w-5 h-5' />
                      </span>
                      {!isSmallScreen ? (
                        <span className='px-2 dark:text-gray-50'>{item.label}</span>
                      ) : null}
                    </div>
                  )}
                </Link>
              ))
            : Menu.map((item, idx) => (
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
                    <div className='flex justify-center items-center md:bg-white md:dark:bg-gray-900 bg-opacity-30 -mr-4 px-3 py-1 rounded-full'>
                      <span className='bg-black dark:bg-gray-300 p-2 rounded-full'>
                        <item.icon className='w-4 h-4 fill-gray-50 dark:fill-neutral-900' />
                      </span>
                      {!isSmallScreen ? (
                        <span className='px-2 dark:text-gray-50'>{item.label}</span>
                      ) : null}
                    </div>
                  ) : (
                    <div className='flex justify-center items-center'>
                      <span className='[&>svg]:w-5 inline-block py-1.5'>
                        <item.icon className='w-5 h-5' />
                      </span>
                      {!isSmallScreen ? (
                        <span className='px-2 dark:text-gray-50'>{item.label}</span>
                      ) : null}
                    </div>
                  )}
                  {item.totalUniqueItems ? (
                    <span className='absolute -top-2 right-2 rounded-full bg-red-700 py-0 px-1.5 text-xs text-white'>
                      {item.totalUniqueItems}
                    </span>
                  ) : null}
                </Link>
              ))}
        </menu>
      </section>
    </>
  )
}

export default Menu

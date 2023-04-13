import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import useAuth from '@/hooks/useAuth'
import { parseJson } from '@/utils/jsonTools'
import { USER_DATA } from '@/constants'
import UsersIcon from './Icons/UsersIcon'
import CartNavLink from './CartNavLink'

const Nav = () => {
  const { menuToggler, getLocalStorageUser } = useContext(AppSettingsContext)
  const { userData, isAuth } = useAuth()
  const { id, username, avatarUrl, type } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData

  return (
    <nav className='flex-no-wrap relative flex w-full items-center justify-between py-4 px-5 lg:flex-wrap lg:justify-start container mx-auto max-w-6xl'>
      <div className='flex w-full flex-wrap items-center justify-between'>
        <button
          className='hidden md:block border-0 bg-transparent py-2 px-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200'
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          id={`navigationToggler`}
          onClick={menuToggler}
        >
          <span className='[&>svg]:w-7'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-7 w-7'
            >
              <path
                fillRule='evenodd'
                d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </button>

        {type === 'admin' || type === 'supplier' ? null : <CartNavLink />}

        <div className='relative flex items-center'>
          <div className='relative'>
            <Link
              className='flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none'
              to={!id ? '/login' : '/profile'}
              role='link'
              aria-expanded='false'
              aria-label={!id ? 'Login to your account' : 'view your profile page'}
            >
              {isAuth ? (
                <img
                  src={avatarUrl}
                  className='rounded-full w-8 h-8'
                  style={{ height: '32px', width: '32px' }}
                  alt={username + ' Avatar'}
                  loading='lazy'
                />
              ) : (
                <UsersIcon className='border rounded-full p-1 h-8 w-8 hover:border-black transition-colors duration-300' />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav

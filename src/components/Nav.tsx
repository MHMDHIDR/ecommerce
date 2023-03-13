import { Link } from 'react-router-dom'

const Nav = () => (
  <nav className='flex-no-wrap relative flex w-full items-center justify-between py-4 lg:flex-wrap lg:justify-start'>
    <div className='flex w-full flex-wrap items-center justify-between px-6'>
      <button
        className='block border-0 bg-transparent py-2 px-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden'
        type='button'
        data-te-collapse-init
        data-te-target='#navbarSupportedContent1'
        aria-controls='navbarSupportedContent1'
        aria-expanded='false'
        aria-label='Toggle navigation'
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

      <div className='relative flex items-center'>
        <div className='relative'>
          <Link
            className='hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none'
            to='/profile'
            role='button'
            aria-expanded='false'
          >
            <img
              src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
              className='rounded-full w-8 h-8'
              style={{ height: '32px', width: '32px' }}
              alt=''
              loading='lazy'
            />
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Nav

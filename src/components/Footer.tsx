import { Link } from 'react-router-dom'
import HomeIcon from './Icons/HomeIcon'

const Footer = () => (
  <footer className='fixed flex-no-wrap bottom-0 rounded-tl-3xl rounded-tr-3xl flex w-full items-center justify-between py-4 lg:flex-wrap lg:justify-start shadow-[0_-1px_7px_0_rgb(97_97_97_/_30%)] bg-gray-100 dark:bg-gray-800 transition-colors px-6 md:px-10 lg:px-20 bg-opacity-50 backdrop-blur-sm saturate-[180%]'>
    <Link
      to={`/`}
      className='block text-sm bg-gray-200 text-black rounded-full'
      type='button'
      aria-controls='navbar'
      aria-expanded='false'
      aria-label='Toggle navigation'
    >
      <span className='flex items-center'>
        <span className='bg-black p-2 rounded-full'>
          <HomeIcon className='w-4 h-4 fill-white' />
        </span>
        <span className='px-3 py-1'>Home</span>
      </span>
    </Link>

    <div className='relative flex items-center gap-8'>
      <Link
        className='mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
        to={`/cart`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-5 w-5'
        >
          <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
        </svg>
      </Link>
      <div className='relative'>
        <Link
          className='hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
          to={`/notifications`}
          role='button'
          aria-expanded='false'
        >
          <span className='[&>svg]:w-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-5 w-5'
            >
              <path
                fillRule='evenodd'
                d='M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <span className='absolute -mt-2.5 ml-2 rounded-full bg-red-700 py-0 px-1.5 text-xs text-white'>
            1
          </span>
        </Link>
      </div>
      <div className='relative'>
        <Link
          className='hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none'
          to={`/account`}
          role='button'
          aria-expanded='false'
        >
          <img
            src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
            className='rounded-full'
            style={{ height: '20px', width: '20px' }}
            alt=''
            loading='lazy'
          />
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer

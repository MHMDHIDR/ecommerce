import { Link } from 'react-router-dom'
import Logo from '../Icons/Logo'
import FooterShape from './FooterShape'
import { Facebook, Instagram, Twitter } from '../Icons/Socials'
import Divider from '../Divider'

const Footer = () => (
  <footer className='relative bg-deep-purple-accent-400 mt-32 bg-blue-gray-400 dark:bg-blue-gray-900'>
    <FooterShape className='fill-blue-gray-400 dark:fill-blue-gray-900' />
    <div className='px-4 pt-12 pb-20 md:pb-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 rtl select-none'>
      <div className='grid gap-16 row-gap-10 mb-8 lg:grid-cols-6'>
        <div className='md:max-w-md lg:col-span-2 hidden lg:block'>
          <Link
            to='/'
            aria-label='Go home'
            title='Company'
            className='inline-flex gap-x-2 items-center'
          >
            <Logo />
            <span>موقع eCommerce Co.</span>
          </Link>
          <div className='mt-4 lg:max-w-sm'>
            <p className='text-sm'>
              موقع eCommerce، هو موقع لعرض السلع والبضائع المتنوعة في مختلف المجالات
              وعرضها للبيع
            </p>
            <p className='mt-4 text-sm'>
              يوفر الموقع إمكانية الدفع عند التوصيل وذلك لجميع البضائع المتوفرة على الموقع
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4'>
          <div>
            <p className='font-bold tracking-wide text-blue-800 dark:text-blue-400'>
              ملابس
            </p>
            <ul className='mt-2 space-y-2'>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ملابس رجالية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ملابس نسائية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ملابس أطفال
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ملابس نسائية
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='font-bold tracking-wide text-blue-800 dark:text-blue-400'>
              الكترونيات
            </p>
            <ul className='mt-2 space-y-2'>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  هواتف
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  حواسيب
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  اكسسوارات
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ترفيه
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='font-bold tracking-wide text-blue-800 dark:text-blue-400'>
              منوعات
            </p>
            <ul className='mt-2 space-y-2'>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  نظارات
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ساعات يدوية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ساعات يدوية رجالية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  ساعات يدوية نسائية
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='font-bold tracking-wide text-blue-800 dark:text-blue-400'>
              أحذية
            </p>
            <ul className='mt-2 space-y-2'>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  أحذية رياضية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  أحذية رجالية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  أحذية نسائية
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='duration-300 hover:text-blue-800 dark:hover:text-blue-400'
                >
                  أحذية أطفال
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Divider />

      <div className='flex flex-col justify-between items-center pt-5 md:pt-0 sm:flex-row text-xs'>
        <p className='dark:text-gray-100'>
          جميع الحقوق محفوظة &copy;{' '}
          {new Date().getFullYear() === 2023
            ? '2023'
            : `2023 - ${new Date().getFullYear()}`}
        </p>
        <div className='flex items-center mt-4 gap-5 sm:mt-0'>
          <span>تجدنا على</span>
          <Link
            to='https://twitter.com/'
            target='_blank'
            data-tooltip='Twitter'
            className='transition-colors duration-300 hover:text-blue-800 dark:hover:text-blue-400'
          >
            <Twitter className='w-7' />
          </Link>
          <Link
            to='https://instagram.com/'
            target='_blank'
            data-tooltip='Instagram'
            className='transition-colors duration-300 hover:text-blue-800 dark:hover:text-blue-400'
          >
            <Instagram className='w-7' />
          </Link>
          <Link
            to='https://facebook.com/'
            target='_blank'
            data-tooltip='Facebook'
            className='transition-colors duration-300 hover:text-blue-800 dark:hover:text-blue-400'
          >
            <Facebook className='w-7' />
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer

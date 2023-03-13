import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Footer from '../components/Footer'
import BorderLink from '../components/Icons/BorderLink'
import BackButton from '../components/Icons/BackButton'
import { PROFILE_LINKS } from '../constants'

const Profile = () => {
  useDocumentTitle('إعدادات الحساب')

  return (
    <Suspense fallback={<LoadingPage />}>
      <section className='container px-5 py-20 mx-auto rtl flex justify-center items-center'>
        <BackButton to='/' className='w-8 h-8 absolute z-50 top-6 left-6' />

        <div className='flex flex-col w-full'>
          <Link
            to={`edit`}
            className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white p-2 shadow-md'
          >
            <img
              className='h-16 w-16 rounded-lg object-cover'
              src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
              alt='profile image'
            />
            <div className='py-2'>
              <h5 className='text-md font-semibold text-gray-800'>اسم المستخدم</h5>
              <p className='text-sm text-gray-600'>mr.hamood277@gmail.com</p>
            </div>
          </Link>
          <div className='p-3 border border-gray-400 rounded-xl my-10 space-y-7'>
            {PROFILE_LINKS.slice(0, PROFILE_LINKS.length - 2).map(
              ({ label, to }: { label: string; to: string }, idx: number) => (
                <BorderLink key={idx}>
                  <Link className='inline-block w-full' to={to}>
                    {label}
                  </Link>
                </BorderLink>
              )
            )}
          </div>
          <div className='p-3 border border-gray-400 rounded-xl space-y-7'>
            {PROFILE_LINKS.slice(PROFILE_LINKS.length - 2, PROFILE_LINKS.length).map(
              ({ label, to }: { label: string; to: string }, idx: number) => (
                <BorderLink key={idx}>
                  <Link className='inline-block w-full' to={to}>
                    {label}
                  </Link>
                </BorderLink>
              )
            )}
          </div>
        </div>
      </section>
      <Footer />
    </Suspense>
  )
}

export default Profile

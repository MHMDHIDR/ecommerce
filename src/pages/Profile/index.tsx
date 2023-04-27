import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useAuth from '@/hooks/useAuth'
import { isSmallScreen, PROFILE_LINKS, USER_DATA } from '@/constants'
import { parseJson } from '@/utils/jsonTools'
import { AppSettingsProps, UserTypes } from '@/types'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import BorderLink from '@/components/Icons/BorderLink'
import BackButton from '@/components/Icons/BackButton'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import LazyImage from '@/components/LazyImage'

const Profile = () => {
  const DOCUMENT_TITLE = 'إعدادات الحساب'
  useDocumentTitle(DOCUMENT_TITLE)

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { loading, userData } = useAuth()
  const {
    id: accountId,
    avatarUrl,
    username,
    firstname,
    lastname,
    phone,
    type
  } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser()) ?? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData

  return loading ? (
    <LoadingPage />
  ) : !accountId ? (
    <ModalNotFound
      msg={`عليك تسجيل الدخول أولاً للمتابعة`}
      btnLink='/login?r=profile'
      btnName='تسجيل الدخول'
    />
  ) : (
    <Layout>
      <section className='container px-5 py-20 mx-auto rtl flex justify-center items-center max-w-6xl'>
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}

        <div className='flex flex-col w-full h-screen'>
          <Link
            to={`edit`}
            className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white dark:bg-gray-700 p-2 shadow-md'
          >
            <LazyImage
              className='h-16 w-16 rounded-lg object-cover'
              src={avatarUrl}
              alt={`${username} Avatar`}
            />
            <div className='py-2'>
              <h5 className='text-md font-semibold text-gray-800 dark:text-gray-100'>
                {`${firstname} ${lastname}`}
              </h5>
              <p className='text-sm text-gray-600 dark:text-gray-100 ltr text-right'>
                {phone}
              </p>
            </div>
          </Link>
          <div className='p-3 border border-gray-400 rounded-xl my-10 space-y-7'>
            {PROFILE_LINKS.filter(link => {
              return link.to === '/completed-orders' ||
                link.to === 'favourites' ||
                link.to === 'shipping-address'
                ? type === UserTypes.User
                : true
            })
              .slice(0, PROFILE_LINKS.length - 2)
              .map(({ label, to }: { label: string; to: string }, idx: number) => (
                <BorderLink key={idx}>
                  <Link className='inline-block w-full' to={to}>
                    {label}
                  </Link>
                </BorderLink>
              ))}
          </div>
          {type === UserTypes.User ? (
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
          ) : null}
        </div>
      </section>
    </Layout>
  )
}

export default Profile

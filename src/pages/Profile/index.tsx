import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useAuth from '@/hooks/useAuth'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import BorderLink from '@/components/Icons/BorderLink'
import BackButton from '@/components/Icons/BackButton'
import { isSmallScreen, PROFILE_LINKS, USER_DATA } from '@/constants'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { getCookies } from '@/utils/cookies'
import { AppSettingsProps, UserType } from '@/types'
import { useAxios } from '@/hooks/useAxios'

const Profile = () => {
  useDocumentTitle('إعدادات الحساب')
  const token = getCookies()
  const { loading, userData } = useAuth()
  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)

  const { id: accountId } = loading
    ? parseJson(getLocalStorageUser())[0] || USER_DATA
    : userData

  const [fetchedUser, setFetchedUser] = useState<UserType | null>(null)

  const { loading: loadingFetch, response } = useAxios({
    url: `/users/${accountId}`,
    headers: stringJson({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (!loadingFetch && response !== null) {
      setFetchedUser(response !== null && response[0])
    }
  }, [response])

  return loadingFetch !== null && fetchedUser === null ? (
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

        <div className='flex flex-col w-full'>
          <Link
            to={`edit`}
            className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white dark:bg-gray-700 p-2 shadow-md'
          >
            <img
              className='h-16 w-16 rounded-lg object-cover'
              src={fetchedUser?.avatarUrl}
              alt={`${fetchedUser?.username} Avatar`}
            />
            <div className='py-2'>
              <h5 className='text-md font-semibold text-gray-800 dark:text-gray-100'>
                {fetchedUser?.username}
              </h5>
              <p className='text-sm text-gray-600 dark:text-gray-100 ltr text-right'>
                {fetchedUser?.phone}
              </p>
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
    </Layout>
  )
}

export default Profile

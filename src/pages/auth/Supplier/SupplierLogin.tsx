import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EyeIconClose, EyeIconOpen } from '@/components/Icons/EyeIcon'
import { API_URL, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import notify from '@/utils/notify'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { setCookies } from '@/utils/cookies'
import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { catchResponse } from '@/types'

const SupplierLogin = () => {
  const DOCUMENT_TITLE = 'الدخول للوحة تحكم التاجر'
  useDocumentTitle(DOCUMENT_TITLE)

  const { loading, userData } = useAuth()
  const { id } = userData || USER_DATA

  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [loginStatus, setLoginStatus] = useState<any>(null)
  const [loginMsg, setLoginMsg] = useState<any>('')
  const [isLoginIn, setIsLoginIn] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('tel', tel)
    formData.append('password', password)

    try {
      setIsLoginIn(true)
      const { data } = await axios.post(`${API_URL}/users/login-supplier`, formData)
      const { supplierLoggedIn, message, token } = data
      setCookies(token)

      setLoginStatus(supplierLoggedIn)
      setLoginMsg(message)
    } catch (error: any) {
      const {
        response: {
          data: { message, supplierLoggedIn }
        }
      }: catchResponse = error
      setLoginStatus(supplierLoggedIn)
      setLoginMsg(message)
    } finally {
      setIsLoginIn(false)
    }
  }

  //this will ensure I can't access login page if i'm already logged in
  useEffect(() => {
    if (id && loginStatus === 1) {
      const timeoutId = setTimeout(() => {
        navigate('/')
      }, TIME_TO_EXECUTE)
      return () => {
        clearTimeout(timeoutId)
      }
    } else if (id !== '' && loginStatus === null) {
      navigate('/')
    }
  }, [id, loginStatus])

  return loading ? (
    <LoadingPage />
  ) : (
    <section className='h-screen'>
      <div className='container px-6 py-16 mx-auto max-w-6xl'>
        <div className='hidden'>
          {loginStatus === 1
            ? notify({
                type: 'success',
                msg: loginMsg,
                position: 'top-center',
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: '/supplier'
              })
            : loginStatus === 0
            ? notify({ type: 'error', msg: loginMsg, position: 'top-center' })
            : null}
        </div>

        <div className='flex h-full flex-wrap items-center justify-center'>
          <img src='assets/img/logo.png' className='w-40 h-32 mb-10' alt='Logo image' />

          <form className='w-full rtl' onSubmit={handleLogin}>
            <label htmlFor='userTel' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] pl-24 mt-5 w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-blue-300 transition-all duration-200 ease-linear data-[te-input-state-active]:placeholder:opacity-100 dark:text-gray-200'
                id='userTel'
                min={5}
                onChange={e => setTel(e.target.value)}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] dark:text-gray-200 dark:peer-focus:text-gray-200'>
                رقم الهاتف
              </span>
            </label>

            <label htmlFor='password' className='relative flex mb-6'>
              <input
                type={isPassVisible ? 'text' : 'password'}
                className='peer border-b block min-h-[auto] mt-5 pl-24 w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-blue-300 transition-all duration-200 ease-linear dark:text-gray-200'
                id='password'
                min={5}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                className='absolute cursor-pointer p-3 text-xs text-black capitalize transition-all select-none left-5 top-5 sm:text-sm md:text-lg dark:text-gray-100 opacity-60;'
                onClick={() => setIsPassVisible((prevState: boolean) => !prevState)}
              >
                {isPassVisible ? <EyeIconOpen /> : <EyeIconClose />}
              </span>
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] dark:text-gray-200 dark:peer-focus:text-gray-200'>
                كلمة المرور
              </span>
            </label>

            <button
              type='submit'
              className={`inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-black shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-700 dark:bg-white${
                isLoginIn ? ' disabled:opacity-30 disabled:cursor-not-allowed' : ''
              }`}
            >
              {isLoginIn ? (
                <span className='flex items-center w-full gap-x-2 justify-center'>
                  <LoadingSpinner />
                  تسجيل الدخول
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </button>

            <div className='my-6 flex justify-between gap-x-6'>
              <Link to='forgot'>نسيت كلمة المرور؟</Link>
              <Link to='/supplier-signup'>تسجيل حساب جديد</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default SupplierLogin

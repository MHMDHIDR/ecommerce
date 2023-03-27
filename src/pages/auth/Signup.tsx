import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Google } from '@/components/Icons/Socials'
import { API_URL } from '@/constants'
import axios from 'axios'
import { EyeIconClose, EyeIconOpen } from '@/components/Icons/EyeIcon'
import notify from '@/utils/functions/notify'
import { LoadingSpinner } from '@/components/Loading'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [regStatus, setRegStatus] = useState<number | null>(null)
  const [regMsg, setRegMsg] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', username)
    formData.append('tel', tel)
    formData.append('password', password)

    try {
      setIsRegistering(true)
      const { data } = await axios.post(`${API_URL}/users/register`, formData)
      const { userAdded, message } = data

      setRegStatus(userAdded)
      setRegMsg(message)
    } catch (error) {
      setRegStatus(0)
      setRegMsg(`عفواً!، حدث خطأ ما: ${error}`)
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <section className='h-screen'>
      <div className='container px-6 py-16 mx-auto max-w-6xl'>
        <div className='hidden'>
          {regStatus === 1
            ? notify({
                type: 'success',
                msg: regMsg,
                reloadIn: 5000,
                reloadTo: '/login'
              })
            : regStatus === 0
            ? notify({ type: 'error', msg: regMsg })
            : null}
        </div>

        <div className='flex h-full flex-wrap items-center justify-center'>
          <img src='assets/img/logo.png' className='w-40 h-32 mb-10' alt='Logo image' />

          <form className='w-full rtl' onSubmit={handleRegister}>
            <label htmlFor='username' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='username'
                placeholder='اسم المستخدم'
                onChange={e => setUsername(e.target.value)}
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                اسم المستخدم
              </span>
            </label>

            <label htmlFor='tel' className='relative flex mb-6'>
              <input
                type='tel'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='tel'
                placeholder='رقم الهاتف'
                onChange={e => setTel(e.target.value)}
                required
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                رقم الهاتف
              </span>
            </label>

            <label htmlFor='password' className='relative flex mb-6'>
              <input
                type={isPassVisible ? 'text' : 'password'}
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='password'
                placeholder='كلمة المرور'
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                className='absolute cursor-pointer p-3 text-xs text-black capitalize transition-all select-none left-10 sm:text-sm md:text-lg dark:text-gray-100 opacity-60;'
                onClick={() => setIsPassVisible((prevState: boolean) => !prevState)}
              >
                {isPassVisible ? <EyeIconClose /> : <EyeIconOpen />}
              </span>
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                كلمة المرور
              </span>
            </label>

            <div className='mb-6 flex items-center justify-between'>
              <div className='flex gap-x-2 mb-[0.125rem] min-h-[1.5rem]'>
                <input
                  type='checkbox'
                  id='terms&condCheckbox'
                  onChange={e =>
                    console.log(
                      `terms & conditions Checkbox is: ${
                        e.target.checked ? 'checked' : 'Unchecked'
                      }`
                    )
                  }
                  defaultChecked={true}
                  required
                />
                <label className='hover:cursor-pointer' htmlFor='terms&condCheckbox'>
                  بالضغط هنا فأنت توافق على
                  <div className='inline-flex items-center gap-x-2 pr-2'>
                    <Link to='/terms-and-conditions' className='underline-hover '>
                      شروط الاستخدام
                    </Link>
                    و
                    <Link to='/privacy-policy' className='underline-hover '>
                      سياسة الخصوصية
                    </Link>
                  </div>
                </label>
              </div>
            </div>

            <button
              type='submit'
              className={`inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-700 dark:bg-white${
                isRegistering || regStatus === 1
                  ? ' disabled:opacity-30 disabled:cursor-not-allowed'
                  : ''
              }`}
            >
              {isRegistering ? (
                <>
                  <LoadingSpinner />
                  &nbsp; جارِ التسجيل...
                </>
              ) : (
                'تسجيل'
              )}
            </button>

            <Link to='/login' className='transition ease-in-out inline-block mt-4'>
              لديك حساب بالفعل؟ سجل الدخول من هنا
            </Link>

            <div className='flex relative justify-center items-center m-4 before:[background:linear-gradient(90deg,transparent,#000,transparent)] before:absolute before:left-0 before:top-1/2 before:w-full before:h-px'>
              <span className='dark:text-neutral-200 bg-white dark:bg-gray-800 z-10 px-2'>
                أو
              </span>
            </div>

            <button
              type='button'
              aria-label='Continue with facebook'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 w-full md:mr-10 lg:mr-32 md:w-80 flex md:inline-flex items-center justify-center mt-5 dark:bg-white'
              role='button'
            >
              <Google />
              <span className='text-base font-medium mr-4 text-gray-700'>
                تسجيل حساب جديد مع جوجل
              </span>
            </button>
            <button
              type='button'
              aria-label='Continue with facebook'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 w-full md:mr-10 lg:mr-32 md:w-80 flex md:inline-flex items-center justify-center mt-5 dark:bg-white'
              role='button'
            >
              <Facebook />
              <span className='text-base font-medium mr-4 text-gray-700'>
                تسجيل حساب جديد مع فيسبوك
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Signup

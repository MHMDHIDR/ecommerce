import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Google } from '../../components/Icons/Socials'
import ModalSuccess from '../../components/Modal/ModalSuccess'

const Signup = () => {
  const [isAuth, setIsAuth] = useState(false)

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsAuth(true)
  }

  return (
    <section className='h-screen'>
      {isAuth && (
        <ModalSuccess
          msg='تم التسجيل بنجاح، يمكنك تصفح الموقع بالضغط على بدأ التسوق'
          btnName='بدأ التسوق'
          fullscreen
        />
      )}

      <div className='container px-6 py-16 mx-auto max-w-6xl'>
        <div className='flex h-full flex-wrap items-center justify-center'>
          <img src='assets/img/logo.png' className='w-40 h-32 mb-10' alt='Logo image' />

          <form className='w-full rtl' onSubmit={handleSignup}>
            <label htmlFor='username' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='username'
                placeholder='اسم المستخدم'
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                اسم المستخدم
              </span>
            </label>

            <label htmlFor='userTel' className='relative flex mb-6'>
              <input
                type='tel'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='userTel'
                placeholder='رقم الهاتف'
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                رقم الهاتف
              </span>
            </label>

            <label htmlFor='password' className='relative flex mb-6'>
              <input
                type='password'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                id='password'
                placeholder='كلمة المرور'
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                كلمة المرور
              </span>
            </label>

            <div className='mb-6 flex items-center justify-between'>
              <div className='flex gap-x-2 mb-[0.125rem] min-h-[1.5rem]'>
                <input
                  type='checkbox'
                  id='terms&condCheckbox'
                  onChange={e => console.log(e.target.checked)}
                  defaultChecked={true}
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
              className='inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-600'
            >
              تسجيل
            </button>

            <Link to='/login' className='transition ease-in-out inline-block mt-4'>
              لديك حساب بالفعل؟ سجل الدخول من هنا
            </Link>

            <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
              <span className='mx-4 mb-0 text-center font-semibold dark:text-neutral-200'>
                أو
              </span>
            </div>

            <Link
              to={'facebookLogin'}
              aria-label='Continue with facebook'
              role='button'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 w-full md:mr-10 lg:mr-32 md:w-80 flex md:inline-flex items-center justify-center mt-5'
            >
              <Google />
              <p className='text-base font-medium mr-4 text-gray-700'>
                تسجيل حساب جديد مع جوجل
              </p>
            </Link>
            <Link
              to={'facebookLogin'}
              aria-label='Continue with facebook'
              role='button'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 w-full md:mr-10 lg:mr-32 md:w-80 flex md:inline-flex items-center justify-center mt-5'
            >
              <Facebook />
              <p className='text-base font-medium mr-4 text-gray-700'>
                تسجيل حساب جديد مع فيسبوك
              </p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Signup

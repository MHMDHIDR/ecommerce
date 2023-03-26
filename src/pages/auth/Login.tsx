import { Link } from 'react-router-dom'
import { Facebook, Google } from '@/components/Icons/Socials'

const Login = () => {
  return (
    <section className='h-screen'>
      <div className='container px-6 py-16 mx-auto max-w-6xl'>
        <div className='flex h-full flex-wrap items-center justify-center'>
          <img src='assets/img/logo.png' className='w-40 h-32 mb-10' alt='Logo image' />

          <form className='w-full rtl'>
            <label htmlFor='userTel' className='relative flex mb-6'>
              <input
                type='text'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-gray-200'
                id='userTel'
                min={5}
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                رقم الهاتف
              </span>
            </label>

            <label htmlFor='password' className='relative flex mb-6'>
              <input
                type='password'
                className='peer border-b block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-gray-200'
                id='password'
                min={5}
              />
              <span className='pointer-events-none absolute top-0 right-2 max-w-[90%] text-gray-700 duration-200 -translate-y-[1.15rem] scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200'>
                كلمة المرور
              </span>
            </label>

            <label htmlFor='rememberMe' className='relative flex mb-6'>
              <input
                type='checkbox'
                id='rememberMe'
                onChange={e => console.log(e.target.checked)}
                defaultChecked={true}
              />
              <span className='inline-block pr-2 hover:cursor-pointer'>تذكرني</span>
            </label>

            <button
              type='submit'
              className='inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-black shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-700 dark:bg-white'
            >
              تسجيل الدخول
            </button>

            <div className='my-6 flex justify-between gap-x-6'>
              <Link to='forgot'>نسيت كلمة المرور؟</Link>
              <Link to='/signup'>تسجيل حساب جديد</Link>
            </div>

            <div className='flex relative justify-center items-center m-4 before:[background:linear-gradient(90deg,transparent,#000,transparent)] before:absolute before:left-0 before:top-1/2 before:w-full before:h-px select-none'>
              <span className='dark:text-neutral-200 bg-white z-10 px-2'>أو</span>
            </div>

            <Link
              to={'facebookLogin'}
              aria-label='Continue with facebook'
              role='button'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 w-full md:mr-10 lg:mr-32 md:w-80 flex md:inline-flex items-center justify-center mt-5 dark:bg-white'
            >
              <Google />
              <p className='text-base font-medium mr-4 text-gray-700'>
                تسجيل الدخول مع جوجل
              </p>
            </Link>
            <Link
              to={'facebookLogin'}
              aria-label='Continue with facebook'
              role='button'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 w-full md:mr-10 lg:mr-32 md:w-80 flex md:inline-flex items-center justify-center mt-5 dark:bg-white'
            >
              <Facebook />
              <p className='text-base font-medium mr-4 text-gray-700'>
                تسجيل الدخول مع فيسبوك
              </p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Login

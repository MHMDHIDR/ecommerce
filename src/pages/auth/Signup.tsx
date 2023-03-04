import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className='h-screen'>
      <div className='container h-full px-6 py-24'>
        <div className='flex h-full flex-wrap items-center justify-center lg:justify-between'>
          <div className='mb-12 md:mb-0 md:w-8/12 lg:w-6/12'>
            <img src='assets/img/logo.png' className='w-full' alt='Phone image' />
          </div>
          <div className='md:w-8/12 lg:ml-6 lg:w-5/12'>
            <form>
              <div className='relative mb-6' data-te-input-wrapper-init>
                <input
                  type='text'
                  className='peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                  id='username'
                  placeholder='اسم المستخدم'
                />
                <label
                  htmlFor='username'
                  className='pointer-events-none absolute top-0 right-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200'
                >
                  اسم المستخدم
                </label>
              </div>

              <div className='relative mb-6' data-te-input-wrapper-init>
                <input
                  type='tel'
                  className='peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                  id='usertel'
                  placeholder='رقم الهاتف'
                />
                <label
                  htmlFor='usertel'
                  className='pointer-events-none absolute top-0 right-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200'
                >
                  رقم الهاتف
                </label>
              </div>

              <div className='relative mb-6' data-te-input-wrapper-init>
                <input
                  type='password'
                  className='peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                  id='exampleFormControlInput33'
                  placeholder='كلمة المرور'
                />
                <label
                  htmlFor='exampleFormControlInput33'
                  className='pointer-events-none absolute top-0 right-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200'
                >
                  كلمة المرور
                </label>
              </div>

              <div className='mb-6 flex items-center justify-between'>
                <div className='flex gap-x-6 mb-[0.125rem] min-h-[1.5rem]'>
                  <div className='flex mb-[0.125rem] min-h-[1.5rem]'>
                    <input
                      type='checkbox'
                      id='terms&condCheckbox'
                      onChange={e => console.log(e.target.checked)}
                      defaultChecked={true}
                    />
                    <label
                      className='inline-block pr-3 hover:cursor-pointer'
                      htmlFor='terms&condCheckbox'
                    >
                      بالضغط هنا فأنت توافق على شروط الاستخدام وسياسة الخصوصية
                    </label>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                className='inline-block w-full rounded px-7 py-2.5 text-sm leading-normal text-white dark:text-gray-800 shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out bg-gray-600'
                data-te-ripple-init
                data-te-ripple-color='light'
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
                className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-5'
              >
                <img
                  src='https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg'
                  alt='facebook'
                />
                <p className='text-base font-medium mr-4 text-gray-700'>
                  تسجيل حساب جديد مع جوجل
                </p>
              </Link>
              <Link
                to={'facebookLogin'}
                aria-label='Continue with facebook'
                role='button'
                className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-5'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='mr-2 h-5 w-5'
                  fill='#3b5998'
                  viewBox='0 0 24 24'
                >
                  <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                </svg>
                <p className='text-base font-medium mr-4 text-gray-700'>
                  تسجيل حساب جديد مع فيسبوك
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login

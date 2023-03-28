import useAuth from '@/hooks/useAuth'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import FileUpload from '@/components/FileUpload'
import BorderLink from '@/components/Icons/BorderLink'
import ThemeToggler from '@/components/ThemeToggler'
import { isSmallScreen, USER_DATA } from '@/constants'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { handleLogout } from '@/utils/handleLogout'

const EditProfile = () => {
  useDocumentTitle('تعديل بيانات الحساب')
  const { loading, userData } = useAuth()
  const { username, avatarUrl, phone } = userData || USER_DATA

  return (
    <Layout>
      {loading ? (
        <LoadingPage />
      ) : (
        <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl'>
          {isSmallScreen && (
            <BackButton to='/' className='w-8 h-8 absolute z-50 top-6 left-6' />
          )}

          <form className='relative flex flex-col items-center'>
            <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
              <FileUpload
                data={{
                  defaultImg: [
                    {
                      ImgDisplayName: username + ' profile',
                      ImgDisplayPath: avatarUrl
                    }
                  ],
                  imgName: username + ' profile'
                }}
              />
            </label>
            <label htmlFor='username' className='form__group'>
              <span className='form__label'>الاســـــــــم</span>
              <input
                type='text'
                id='username'
                className='form__input'
                onChange={e => console.log(e.target.value.trim())}
                defaultValue={username}
                required
              />
            </label>
            <div className='form__group'>
              <span className='form__label'>النــــــــــوع</span>
              <label className='form__group' htmlFor='male'>
                <input
                  className='form__input'
                  type='radio'
                  id='male'
                  name='type'
                  value='male'
                  defaultChecked
                />
                 <span>ذكر</span>
              </label>
              <label className='form__group' htmlFor='female'>
                <input
                  className='form__input'
                  type='radio'
                  id='female'
                  name='type'
                  value='female'
                />
                 <span>أنثى</span>
              </label>
            </div>
            <label htmlFor='tel' className='form__group'>
              <span className='form__label'>الهاتــــــف</span>
              <input
                type='tel'
                id='tel'
                className='form__input ltr text-right'
                onChange={e => console.log(e.target.value.trim())}
                defaultValue={phone}
                required
              />
            </label>
            <div className='p-3 border border-gray-400 rounded-xl w-full my-10 space-y-7'>
              <BorderLink>
                <span>اللغة</span>
              </BorderLink>
              <BorderLink>
                <span>الاشعارات</span>
              </BorderLink>
              <BorderLink icon={<ThemeToggler />}>
                <label htmlFor='toggler'>الوضع الداكن</label>
              </BorderLink>
            </div>
            <button
              type='button'
              onClick={() => handleLogout('/')}
              className='rounded-md bg-blue-600 py-2.5 w-full text-sm text-white hover:bg-gray-700 focus:outline-none'
            >
              تسجيل الخروج
            </button>
          </form>
        </section>
      )}
    </Layout>
  )
}

export default EditProfile

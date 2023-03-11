import { Suspense } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import FileUpload from '../components/FileUpload'
import Footer from '../components/Footer'
import BorderLink from '../components/Icons/BorderLink'

const EditProfile = () => {
  useDocumentTitle('تعديل بيانات الحساب')

  return (
    <Suspense fallback={<LoadingPage />}>
      <section className='container overflow-x-hidden px-5 rtl'>
        <form className='relative flex flex-col items-center'>
          <label htmlFor='uploadImg' className='flex items-center gap-y-2 flex-col'>
            <FileUpload
              data={{
                defaultImg: [
                  {
                    ImgDisplayName: 'profile',
                    ImgDisplayPath: 'https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                  }
                ],
                imgName: 'profile'
              }}
            />
          </label>
          <label htmlFor='username' className='form__group'>
            <span className='form__label'>الاســـــــــم</span>
            <input
              type='text'
              id='username'
              className='form__input'
              autoFocus
              required
              onChange={e => console.log(e.target.value.trim())}
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
              className='form__input'
              autoFocus
              required
              onChange={e => console.log(e.target.value.trim())}
            />
          </label>
          <div className='p-3 border border-gray-400 rounded-xl w-full my-10 space-y-7'>
            <BorderLink to={`language`}>
              <span>اللغة</span>
            </BorderLink>
            <BorderLink to={`language`}>
              <span>الاشعارات</span>
            </BorderLink>
            <BorderLink to={`language`}>
              <span>الوضع الداكن</span>
            </BorderLink>
          </div>
          <button
            type='button'
            className='rounded-md bg-blue-600 py-2.5 w-full text-sm text-white hover:bg-gray-700 focus:outline-none'
          >
            تسجيل الخروج
          </button>
        </form>
      </section>
      <Footer />
    </Suspense>
  )
}

export default EditProfile

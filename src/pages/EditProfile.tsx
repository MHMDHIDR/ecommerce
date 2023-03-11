import { Suspense } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import Pen from '../components/Icons/Pen'
import FileUpload from '../components/FileUpload'

const EditProfile = () => {
  useDocumentTitle('إعدادات الحساب')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl flex justify-center items-center'>
          <div className='relative flex flex-col items-center'>
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
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default EditProfile

import { Suspense } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'

const Notifications = () => {
  useDocumentTitle('الاشعارات')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20'>
          <h1 className='font-bold'>الاشعارات</h1>
          <div className='flex flex-col gap-y-3'>
            {[...Array(Math.round(20)).keys()].map((_, idx) => (
              <div key={idx} className='border-b last-of-type:border-b-0 py-2'>
                <div className='flex items-center gap-x-3 bg-white overflow-hidden'>
                  <img
                    className='h-12 w-12 rounded-full object-cover'
                    src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                    alt='Profile'
                    loading='lazy'
                  />
                  <div className='py-2'>
                    <h5 className='text-sm font-bold text-gray-800'>تمت الموافقة</h5>
                    <p className='text-sm text-gray-600 truncate max-w-[35%]'>
                      تمت الموافقة على الطلب، وسيتم التسليم عما قريبتمت الموافقة على
                      الطلب، وسيتم التسليم عما قريبتمت الموافقة على الطلب، وسيتم التسليم
                      عما قريب
                    </p>
                    <span className='text-sm text-gray-400'>قبل {idx + 1} ساعات</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default Notifications

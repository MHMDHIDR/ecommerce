import { Suspense } from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import abstractText from '@/utils/abstractText'

const Notifications = () => {
  useDocumentTitle('الاشعارات')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20 max-w-6xl'>
          <h1 className='font-bold mb-3'>الاشعارات</h1>
          <div className='flex flex-col gap-y-3'>
            {[...Array(Math.round(20)).keys()].map((_, idx) => (
              <div
                key={idx}
                className='border-b dark:border-b-0 last-of-type:border-b-0 py-1'
              >
                <div className='flex items-center gap-x-3 bg-white dark:bg-gray-700 overflow-hidden rounded-lg px-2'>
                  <img
                    className='h-12 w-12 rounded-full object-cover'
                    src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
                    alt='Profile'
                    loading='lazy'
                  />
                  <div className='py-2'>
                    <h5 className='text-sm font-bold text-gray-800 dark:text-gray-200'>
                      تمت الموافقة
                    </h5>
                    <p className='text-sm text-gray-600 dark:text-gray-50'>
                      {abstractText(
                        `تمت الموافقة على الطلب، وسيتم التسليم عما قريبتمت الموافقة على
                      الطلب، وسيتم التسليم عما قريبتمت الموافقة على الطلب، وسيتم التسليم
                      عما قريب`,
                        100
                      )}
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

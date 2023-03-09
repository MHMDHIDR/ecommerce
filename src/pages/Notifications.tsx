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
        </section>
      </Layout>
    </Suspense>
  )
}

export default Notifications

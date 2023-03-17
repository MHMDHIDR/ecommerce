import { Suspense } from 'react'
import Layout from '../../components/Layout'
import { LoadingPage } from '../../components/Loading'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const DashboardMenu = () => {
  useDocumentTitle('عرض المنتجات')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl'>
          <div className='container mx-auto max-w-6xl'>
            <h3 className='mx-0 mt-4 mb-12 text-2xl text-center md:text-3xl'>
              عرض المنتجات
            </h3>
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default DashboardMenu

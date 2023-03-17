import { Suspense } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { LoadingPage } from '../../components/Loading'
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'

const SupplierDashboard = () => {
  useDocumentTitle('لوحة تحكم التاجر')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto mb-20 max-w-6xl rtl'>
          <h2 className='text-xl text-center my-16'>الطلبات الآخيرة</h2>
        </section>
      </Layout>
    </Suspense>
  )
}

export default SupplierDashboard

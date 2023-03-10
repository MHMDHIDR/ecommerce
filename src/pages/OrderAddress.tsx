import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import { MAX_QUANTITY } from '../constants'
import { AddBtn, MinusBtn } from '../components/Icons/Controls'

const OrderAddress = () => {
  useDocumentTitle('عنوان الطلب')
  const [count, setCount] = useState(1)

  const products = [...Array(5).keys()]

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20'>
          <h1 className='font-bold'>عنوان الطلب</h1>
          <div className='flex flex-col gap-y-3'></div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default OrderAddress

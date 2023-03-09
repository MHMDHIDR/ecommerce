import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import { MAX_QUANTITY } from '../constants'
import { AddBtn, MinusBtn } from '../components/Icons/Controls'

const Account = () => {
  useDocumentTitle('إعدادات حساب المستخدم')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20'>
          <h1 className='font-bold'>إعدادات حساب المستخدم</h1>
        </section>
      </Layout>
    </Suspense>
  )
}

export default Account

import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import { AcceptBtn, RejectBtn } from '@/components/TableActions'
import { USER_DATA } from '@/constants'
import { createLocaleDateString } from '@/utils/convertDate'
import NavMenu from '@/components/NavMenu'
import useAuth from '@/hooks/useAuth'
import { getCookies } from '@/utils/cookies'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { useAxios } from '@/hooks/useAxios'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { AppSettingsProps } from '@/types'

const SupplierDashboard = () => {
  const DOCUMENT_TITLE = 'الطلبــــــــات'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { id, type } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())
      : USER_DATA
    : userData

  const [orders, setOrders] = useState<any>()

  const { response, loading } = useAxios({
    url: `/orders`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (response !== null) {
      setOrders(response)
    }
  }, [loading, response])

  return loading ? (
    <LoadingPage />
  ) : !id && type !== 'admin' && type !== 'supplier' ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-auto px-5 rtl mx-auto max-w-6xl h-full mb-20'>
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='py-4'>رقم الطلب</th>
              <th className='py-4'>اسماء المنتجات</th>
              <th className='py-4'>الحالة</th>
              <th className='py-4'>تاريخ الطلب</th>
              <th className='py-4'>الإجراء</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
            <tr></tr>
          </tbody>
        </table>
      </section>
    </Layout>
  )
}

export default SupplierDashboard

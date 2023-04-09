import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import useAuth from '@/hooks/useAuth'
import { useAxios } from '@/hooks/useAxios'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { LoadingPage } from '@/components/Loading'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { AcceptBtn, RejectBtn } from '@/components/TableActions'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import NavMenu from '@/components/NavMenu'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import { API_URL, isSmallScreen, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import goTo from '@/utils/goTo'
import { getCookies } from '@/utils/cookies'
import { AppSettingsProps, ProductProps, UserType } from '@/types'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { createLocaleDateString } from '@/utils/convertDate'
import { removeSlug } from '@/utils/slug'
import notify from '@/utils/notify'

const DashboardOrderDetails = () => {
  const DOCUMENT_TITLE = 'تفاصيل الطلب'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()
  const { id: orderId, userId } = useParams()

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { id, type } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())
      : USER_DATA
    : userData

  const [usersData, setUserData] = useState<UserType | null>(null)
  const [order, setOrder] = useState<any>()
  const [orderItems, setOrderItems] = useState<any>()
  const [actionOrderId, setActionOrderId] = useState('')
  const [actionOrderName, setActionOrderName] = useState('')
  const [eventState, setEventState] = useState('')
  const [actionItemId, setActionItemId] = useState('')
  const [actionSupplierId, setActionSupplierId] = useState('')
  const [productItems, setProductItems] = useState<any>(null)
  const [isActionDone, setIsActionDone] = useState(null)
  const [actionMsg, setActionMsg] = useState('')
  const [isSettingOrderItems, setIsSettingOrderItems] = useState(true)
  const [modalLoading, setModalLoading] = useState<boolean>(false)

  const { response, loading } = useAxios({
    url: `/orders/${orderId}`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  const Users = useAxios({
    url: `/users/${userId}`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (response !== null && Users.response !== null) {
      setOrder(response[0])
      response?.filter((order: any) => {
        const productItemsParsed = parseJson(order.productsItems)
        setProductItems(productItemsParsed)
        setOrderItems(
          type === 'admin'
            ? productItems &&
                Object.values(productItems).flatMap(({ items }: any) => items)
            : productItemsParsed[id]?.items.filter(
                (item: ProductProps) => item.addedById === id
              )
        )
      })
      setUserData(Users.response[0])
      setIsSettingOrderItems(false)
    }
  }, [loading, isSettingOrderItems, Users.response, response])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'acceptBtn':
      case 'rejectBtn': {
        setActionOrderId(e.target.dataset.orderid)
        setActionItemId(e.target.dataset.itemid)
        setActionSupplierId(e.target.dataset.supplierid)
        setActionOrderName(removeSlug(e.target.dataset.name))
        setEventState(e.target.dataset.status)
        setModalLoading(true)
        break
      }
      case 'confirm': {
        eventState === 'reject' || eventState === 'accept'
          ? e.target.dataset.name
            ? handleItemStatus() //update single item status in the order
            : handleOrderStatus() //update whole order status
          : setModalLoading(false)
        break
      }
      case 'cancel': {
        setModalLoading(false)
        break
      }
    }
  })

  const handleItemStatus = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      const { data } = await axios.patch(`${API_URL}/orders/${actionOrderId}`, {
        headers
      })

      const { orderUpdated, message } = data
      setIsActionDone(orderUpdated)
      setActionMsg(message)
      //Remove waiting modal
      setTimeout(() => {
        setModalLoading(false)
      }, 300)
    } catch (err) {
      console.error(err)
    }
  }

  const handleOrderStatus = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      const { data } = await axios.patch(
        `${API_URL}/orders/${actionOrderId}`,
        { orderStatus: eventState },
        { headers }
      )

      const { orderUpdated, message } = data
      setIsActionDone(orderUpdated)
      setActionMsg(message)
      //Remove waiting modal
      setTimeout(() => {
        setModalLoading(false)
      }, 300)
    } catch (err) {
      console.error(err)
    }
  }

  return loading || isSettingOrderItems ? (
    <LoadingPage />
  ) : !id || type !== 'admin' ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-hidden px-5 rtl mx-auto max-w-6xl h-full'>
        {isSmallScreen && <BackButton to='/' className='absolute z-50 top-6 left-6' />}
        <div className='hidden'>
          {isActionDone === 1
            ? notify({
                type: 'success',
                msg: actionMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo(`order/${orderId}/${userId}`)
              })
            : isActionDone === 0
            ? notify({ type: 'error', msg: actionMsg })
            : null}
        </div>
        {/* Confirm Box */}
        {modalLoading && (
          <Modal
            status={Loading}
            classes='text-blue-600 dark:text-blue-400 text-lg'
            msg={`هل أنت متأكد من ${
              eventState === 'reject' ? 'رفض' : eventState === 'accept' ? 'موافقة' : ''
            } ${actionOrderName ? 'طلب ' + actionOrderName : 'الطلب'}؟`}
            ctaConfirmBtns={[
              eventState === 'reject' ? 'رفض' : eventState === 'accept' ? 'موافقة' : '',
              'الغاء'
            ]}
          />
        )}

        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='py-4'>رقم الطلب</th>
              <th className='py-4'>اسم المنتج</th>
              <th className='py-4'>الكميـــــــــة</th>
              <th className='py-4'>الحالة</th>
              <th className='py-4'>تاريخ الطلب</th>
              <th className='py-4'>الإجراء</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
            {orderItems?.length > 0 ? (
              orderItems.map((item: ProductProps, idx: number) => (
                <tr key={item.id}>
                  <td className='py-2'>
                    <span>{idx + 1}</span>
                  </td>
                  <td className='min-w-[15rem] py-2'>
                    <span>{removeSlug(item.itemName)}</span>
                  </td>
                  <td className='py-2'>
                    <span>{item.quantity}</span>
                  </td>
                  <td className='py-2'>
                    <span className='flex flex-col items-center gap-y-1'>
                      <span
                        className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                          item.orderItemStatus === 'accept'
                            ? 'text-green-600'
                            : item.orderItemStatus === 'reject'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.orderItemStatus === 'accept'
                              ? 'bg-green-600'
                              : item.orderItemStatus === 'reject'
                              ? 'bg-red-600'
                              : 'bg-gray-600'
                          }`}
                        ></span>
                        {item.orderItemStatus === 'accept'
                          ? 'الطلب مقبول'
                          : item.orderItemStatus === 'reject'
                          ? 'الطلب مرفوض'
                          : 'بإنتظار الاجراء'}
                      </span>
                      <span>
                        {item.rejectReason!?.length > 1
                          ? item.rejectReason
                          : 'لم يتم تحديد السبب'}
                      </span>
                    </span>
                  </td>
                  <td className='min-w-[13rem] py-2'>
                    <span>{createLocaleDateString(order.orderDate)}</span>
                  </td>
                  <td className='py-2'>
                    <NavMenu>
                      {item.orderItemStatus === 'pending' ? (
                        <>
                          <AcceptBtn
                            id={order.id}
                            itemName={item.itemName}
                            supplierId={item.addedById}
                            itemId={item.id}
                            label='موافقة'
                          />
                          <RejectBtn
                            id={order.id}
                            itemName={item.itemName}
                            supplierId={item.addedById}
                            itemId={item.id}
                          />
                        </>
                      ) : item.orderItemStatus === 'accept' ? (
                        <RejectBtn
                          id={order.id}
                          itemName={item.itemName}
                          supplierId={item.addedById}
                          itemId={item.id}
                        />
                      ) : item.orderItemStatus === 'reject' ? (
                        <AcceptBtn
                          id={order.id}
                          itemName={item.itemName}
                          supplierId={item.addedById}
                          itemId={item.id}
                          label='موافقة'
                        />
                      ) : (
                        <span>لا يوجد إجراء</span>
                      )}
                    </NavMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={100} className='p-5'>
                  <div className='flex flex-col justify-center items-center gap-y-4'>
                    <p className='text-red-600 dark:text-red-400'>
                      عفواً، لم يتم العثور على طلبات
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h2 className='text-xl text-center my-16'>عنوان التوصيل</h2>
        <ul className='flex flex-col justify-center border gap-x-3 p-5 rounded-xl shadow-xl overflow-hidden space-y-3'>
          <li className='flex gap-x-2'>
            <span className='font-bold'>اسم العميل: </span>
            <span className='text-gray-700 dark:text-gray-50'>
              {usersData?.firstname} {usersData?.lastname}
            </span>
          </li>
          <li className='flex gap-x-2'>
            <span className='font-bold'>رقم المنزل: </span>
            <span className='text-gray-700 dark:text-gray-50'>
              {usersData?.houseNumber}
            </span>
          </li>
          <li className='flex gap-x-2'>
            <span className='font-bold'>الشارع:</span>
            <span className='text-gray-700 dark:text-gray-50'>
              {usersData?.streetName}
            </span>
          </li>
          <li className='flex gap-x-2'>
            <span className='font-bold'>الحي: </span>
            <span className='text-gray-700 dark:text-gray-50'>
              {usersData?.neighborhoodName}
            </span>
          </li>
          <li className='flex gap-x-2'>
            <span className='font-bold'>المدينة: </span>
            <span className='text-gray-700 dark:text-gray-50'>{usersData?.cityName}</span>
          </li>
          <li className='flex gap-x-2'>
            <span className='font-bold'>رقم الهاتف: </span>
            <span className='text-gray-700 dark:text-gray-50' dir='auto'>
              {usersData?.phone}
            </span>
          </li>
        </ul>

        <div className='flex items-center justify-center gap-x-20 mt-10'>
          {order?.orderStatus === 'pending' ? (
            <>
              <AcceptBtn id={order.id} label='موافقة' />
              <RejectBtn id={order.id} />
            </>
          ) : order?.orderStatus === 'accept' ? (
            <RejectBtn id={order.id} />
          ) : order?.orderStatus === 'reject' ? (
            <AcceptBtn id={order.id} label='موافقة' />
          ) : (
            <Link
              to={goTo('dashboard')}
              className='text-gray-800 underline-hover text-bold dark:text-white'
            >
              العودة للطلبات
            </Link>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default DashboardOrderDetails

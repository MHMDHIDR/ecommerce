import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import useAuth from '@/hooks/useAuth'
import { useAxios } from '@/hooks/useAxios'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { API_URL, isSmallScreen, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import goTo from '@/utils/goTo'
import { getCookies } from '@/utils/cookies'
import { AppSettingsProps, ProductProps, UserType } from '@/types'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { createLocaleDateString } from '@/utils/convertDate'
import { removeSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import DeliveryAddress from './DeliveryAddress'
import { LoadingPage } from '@/components/Loading'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { AcceptBtn, DeliveredBtn, RejectBtn, ShippedBtn } from '@/components/TableActions'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import NavMenu from '@/components/NavMenu'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import Divider from '@/components/Divider'

const DashboardOrderDetails = () => {
  const DOCUMENT_TITLE = 'تفاصيل الطلب'
  useDocumentTitle(DOCUMENT_TITLE)

  const token = getCookies()
  const { id: orderId, userId } = useParams()

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { id, type } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData

  const [usersData, setUserData] = useState<UserType>(USER_DATA)
  const [order, setOrder] = useState<any>()
  const [orderItems, setOrderItems] = useState<any>()
  const [actionOrderId, setActionOrderId] = useState('')
  const [actionOrderName, setActionOrderName] = useState('')
  const [eventState, setEventState] = useState('')
  const [actionProductId, setActionProductId] = useState('')
  const [actionSupplierId, setActionSupplierId] = useState('')
  const [isActionDone, setIsActionDone] = useState(null)
  const [actionMsg, setActionMsg] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)

  const Users = useAxios({
    url: `/users/${userId}`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  const { data, loading } = useAxios({
    url: `/orders/${orderId}`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  const { response } = useAxios({
    url: `/orders?orderId=${orderId}`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (data !== null && response !== null && Users.data !== null) {
      setOrder(data[0])
      setOrderItems(response)
      setUserData(Users.data[0])
    }
  }, [loading, response, Users.data])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'acceptBtn':
      case 'rejectBtn':
      case 'shippedBtn':
      case 'deliveredBtn': {
        setActionOrderId(e.target.dataset.id)
        setActionProductId(e.target.dataset.productid)
        setActionSupplierId(e.target.dataset.supplierid)
        setActionOrderName(removeSlug(e.target.dataset.name))
        setEventState(e.target.dataset.status)
        setModalLoading(true)
        break
      }
      case 'confirm': {
        eventState === 'accept' && actionOrderName
          ? handleItemStatus()
          : eventState === 'reject' && actionOrderName && rejectReason.length === 0
          ? notify({ type: 'error', msg: 'يجب عليك كتابة سبب الرفض!' })
          : eventState === 'reject' && actionOrderName && rejectReason.length > 1
          ? handleItemStatus()
          : (eventState === 'accept' ||
              eventState === 'reject' ||
              eventState === 'shipped' ||
              eventState === 'delivered') &&
            !actionOrderName
          ? handleOrderStatus()
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

      const { data } = await axios.patch(
        `${API_URL}/orders/${actionOrderId}`,
        {
          eventStateItem: eventState,
          productId: actionProductId,
          rejectReasonItem: rejectReason
        },
        {
          headers
        }
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

  const handleOrderStatus = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      const { data } = await axios.patch(
        `${API_URL}/orders/${actionOrderId}`,
        { eventStateOrder: eventState, rejectReasonOrder: rejectReason },
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

  return loading || data === null || response === null ? (
    <LoadingPage />
  ) : !id || type !== 'admin' ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-auto px-5 rtl mx-auto max-w-6xl h-full'>
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
              eventState === 'reject'
                ? 'رفض'
                : eventState === 'accept'
                ? 'موافقة'
                : eventState === 'shipped'
                ? 'شحن'
                : eventState === 'delivered'
                ? 'توصيل'
                : ''
            } ${actionOrderName ? 'طلب ' + actionOrderName : 'الطلب'}؟`}
            ctaConfirmBtns={[
              eventState === 'reject'
                ? 'رفض'
                : eventState === 'accept'
                ? 'موافقة'
                : eventState === 'shipped'
                ? 'شحن'
                : eventState === 'delivered'
                ? 'توصيل'
                : '',
              'الغاء'
            ]}
            extraComponents={
              eventState === 'reject' ? (
                <textarea
                  name='rejectReason'
                  id='rejectReason'
                  minLength={10}
                  maxLength={1000}
                  className='form__input p-3'
                  placeholder='يجب عليك كتابة سبب الرفض وذلك للمراجعة'
                  onChange={e => setRejectReason(e.target.value.trim())}
                  required
                ></textarea>
              ) : null
            }
          />
        )}
        <h2 className='text-xl text-center mt-20 mb-4'>{DOCUMENT_TITLE}</h2>
        <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='py-4'>رقم الطلب</th>
              <th className='py-4'>اسم المنتج</th>
              <th className='py-4'>الكميـــــــــة</th>
              <th className='py-4'>الحالة</th>
              <th className='py-4'>تاريخ إنشاء الطلب</th>
              <th className='py-4'>تاريخ تحديث الطلب</th>
              <th className='py-4'>الإجراء</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
            {orderItems && orderItems?.length > 0 ? (
              orderItems.map((item: ProductProps, idx: number) => (
                <tr key={idx}>
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
                        {item.orderItemStatus === 'reject'
                          ? item.rejectReason!?.length > 1
                            ? item.rejectReason
                            : 'لم يتم تحديد السبب'
                          : ''}
                      </span>
                    </span>
                  </td>
                  <td className='min-w-[13rem] py-2'>
                    <span>{createLocaleDateString(item.createDate)}</span>
                  </td>
                  <td className='min-w-[13rem] py-2'>
                    <span>{createLocaleDateString(item.updateDate)}</span>
                  </td>
                  <td className='py-2'>
                    <NavMenu>
                      {item.orderItemStatus === 'pending' ? (
                        <>
                          <AcceptBtn
                            id={order.id}
                            itemName={item.itemName}
                            supplierId={item.addedById}
                            productId={item.productId}
                            label='موافقة'
                          />
                          <RejectBtn
                            id={order.id}
                            itemName={item.itemName}
                            supplierId={item.addedById}
                            productId={item.productId}
                          />
                        </>
                      ) : item.orderItemStatus === 'accept' ? (
                        <RejectBtn
                          id={order.id}
                          itemName={item.itemName}
                          supplierId={item.addedById}
                          productId={item.productId}
                        />
                      ) : item.orderItemStatus === 'reject' ? (
                        <AcceptBtn
                          id={order.id}
                          itemName={item.itemName}
                          supplierId={item.addedById}
                          productId={item.productId}
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

        <Divider className='my-10' />

        <DeliveryAddress usersData={usersData} />

        <div className='flex items-center justify-around mt-10'>
          <NavMenu label='تغير حالة الطلب'>
            {order?.orderStatus === 'pending' ? (
              <>
                <AcceptBtn id={order.id} label='موافقة' />
                <RejectBtn id={order.id} />
              </>
            ) : order?.orderStatus === 'accept' ? (
              <>
                <RejectBtn id={order.id} />
                <ShippedBtn id={order.id} />
              </>
            ) : order?.orderStatus === 'reject' ? (
              <AcceptBtn id={order.id} label='موافقة' />
            ) : order?.orderStatus === 'shipped' ? (
              <DeliveredBtn id={order.id} />
            ) : order?.orderStatus === 'delivered' ? (
              <RejectBtn id={order.id} />
            ) : null}
          </NavMenu>
          <Link
            to={goTo('dashboard')}
            className='text-gray-800 underline-hover text-bold dark:text-white mx-auto'
          >
            العودة للطلبات
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default DashboardOrderDetails

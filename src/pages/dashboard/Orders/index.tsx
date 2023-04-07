import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import { AcceptBtn, RejectBtn } from '@/components/TableActions'
import { API_URL, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import { createLocaleDateString } from '@/utils/convertDate'
import NavMenu from '@/components/NavMenu'
import useAuth from '@/hooks/useAuth'
import { getCookies } from '@/utils/cookies'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { useAxios } from '@/hooks/useAxios'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { AppSettingsProps, ProductProps } from '@/types'
import goTo from '@/utils/goTo'
import { removeSlug } from '@/utils/slug'
import useEventListener from '@/hooks/useEventListener'
import axios from 'axios'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import notify from '@/utils/notify'
import { getOrderItems, handleStatusChange } from '@/utils/orders'
import { getUserFullName } from '@/utils/getUser'

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

  const [usersData, setUserData] = useState()
  const [orders, setOrders] = useState<any>()
  const [orderItems, setOrderItems] = useState<any>()
  const [actionOrderId, setActionOrderId] = useState('')
  const [actionOrderName, setActionOrderName] = useState('')
  const [eventState, setEventState] = useState('')
  const [actionItemId, setActionItemId] = useState('')
  const [productItems, setProductItems] = useState<any>(null)
  const [isActionDone, setIsActionDone] = useState(null)
  const [actionMsg, setActionMsg] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)

  const { response, loading } = useAxios({
    url: `/orders`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  const Users = useAxios({
    url: `/users`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    if (response !== null && Users.response !== null) {
      setOrders(response)
      setUserData(Users.response)
    }
  }, [loading, response])

  useEffect(() => {
    response?.map((order: any) => {
      const productItemsParsed = parseJson(order.productsItems)
      setProductItems(productItemsParsed)
      setOrderItems(
        type === 'admin'
          ? productItems && Object.values(productItems).flatMap(({ items }: any) => items)
          : productItemsParsed[id]?.items.filter(
              (item: ProductProps) => item.addedById === id
            )
      )
    })
  }, [response])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'acceptBtn':
      case 'rejectBtn': {
        setActionOrderId(e.target.dataset.orderid)
        setActionItemId(e.target.dataset.itemid)
        setActionOrderName(removeSlug(e.target.dataset.name))
        setEventState(e.target.dataset.status)
        setModalLoading(true)
        break
      }
      case 'confirm': {
        eventState === 'accept'
          ? handleItemStatus()
          : eventState === 'reject' && rejectReason.length === 0
          ? alert('يجب عليك كتابة سبب الرفض!')
          : eventState === 'reject' && rejectReason.length > 1
          ? handleItemStatus()
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
          productItems: stringJson(
            handleStatusChange({
              productItems,
              id,
              newStatus: eventState,
              itemId: actionItemId
            })
          )
        },
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

  return loading ? (
    <LoadingPage />
  ) : !id || (type !== 'admin' && type !== 'supplier') ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-auto px-5 rtl mx-auto max-w-6xl h-full mb-20'>
        <div className='hidden'>
          {isActionDone === 1
            ? notify({
                type: 'success',
                msg: actionMsg
                // ,reloadIn: TIME_TO_EXECUTE,
                // reloadTo: goTo(type === 'admin' ? 'dashboard' : 'supplier')
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
            } طلب ${actionOrderName} ؟`}
            ctaConfirmBtns={[
              eventState === 'reject' ? 'رفض' : eventState === 'accept' ? 'موافقة' : '',
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
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        {type === 'supplier' ? (
          <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='py-4'>رقم الطلب</th>
                <th className='py-4'>اسم المنتج</th>
                <th className='py-4'>الكميـــــــــة</th>
                <th className='py-4'>الحالة</th>
                <th className='py-4'>سبب الرفض</th>
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
                      <span
                        className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                          item.itemStatus === 'accept'
                            ? 'text-green-600'
                            : item.itemStatus === 'reject'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.itemStatus === 'accept'
                              ? 'bg-green-600'
                              : item.itemStatus === 'reject'
                              ? 'bg-red-600'
                              : 'bg-gray-600'
                          }`}
                        ></span>
                        {item.itemStatus === 'accept'
                          ? 'الطلب مقبول'
                          : item.itemStatus === 'reject'
                          ? 'الطلب مرفوض'
                          : 'بإنتظار الاجراء'}
                      </span>
                    </td>
                    <td className='min-w-[13rem] py-2'>
                      <span>{item.rejectReason ? item.rejectReason : 'الطلب مقبول'}</span>
                    </td>
                    <td className='min-w-[13rem] py-2'>
                      <span>
                        {createLocaleDateString(orders && orders[0]?.orderDate)}
                      </span>
                    </td>
                    <td className='py-2'>
                      <NavMenu>
                        {item.itemStatus === 'pending' ? (
                          <>
                            <AcceptBtn
                              id={orders && orders[0]?.Id}
                              itemName={item.itemName}
                              itemId={item.id}
                              label='موافقة'
                            />
                            <RejectBtn
                              id={orders && orders[0]?.Id}
                              itemName={item.itemName}
                              itemId={item.id}
                            />
                          </>
                        ) : item.itemStatus === 'accept' ? (
                          <RejectBtn
                            id={orders && orders[0]?.Id}
                            itemName={item.itemName}
                            itemId={item.id}
                          />
                        ) : item.itemStatus === 'reject' ? (
                          <AcceptBtn
                            id={orders && orders[0]?.Id}
                            itemName={item.itemName}
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
        ) : type === 'admin' ? (
          <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='py-4'>رقم الطلب</th>
                <th className='py-4'>اسم العميل</th>
                <th className='py-4'>الحالة</th>
                <th className='py-4'>تاريخ إنشاء الطلب</th>
                <th className='py-4'>تاريخ تحديث الحالة</th>
                <th className='py-4'>الإجراء</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
              {orders?.length > 0 ? (
                orders.map((order: any, idx: number) => (
                  <tr key={order.Id}>
                    <td className='py-2'>
                      <span>{idx + 1}</span>
                    </td>
                    <td className='min-w-[15rem] py-2'>
                      <span>
                        {usersData && getUserFullName(usersData, order.orderedBy)}
                      </span>
                    </td>
                    <td className='py-2'>
                      <span
                        className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
                          order.orderStatus === 'accept'
                            ? 'text-green-600'
                            : order.orderStatus === 'reject'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            order.orderStatus === 'accept'
                              ? 'bg-green-600'
                              : order.orderStatus === 'reject'
                              ? 'bg-red-600'
                              : 'bg-gray-600'
                          }`}
                        ></span>
                        {order.orderStatus === 'accept'
                          ? 'الطلب مقبول'
                          : order.orderStatus === 'reject'
                          ? 'الطلب مرفوض'
                          : 'بإنتظار الاجراء'}
                      </span>
                    </td>
                    <td className='min-w-[13rem] py-2'>
                      <span>{createLocaleDateString(order.orderDate)}</span>
                    </td>
                    <td className='min-w-[13rem] py-2'>
                      <span>{createLocaleDateString(order.orderDate)}</span>
                    </td>
                    <td className='py-2'>
                      <Link
                        to={`order/${order.Id}/${order.orderedBy}`}
                        className='inline-block p-2 text-xs text-white bg-green-600 rounded-md hover:bg-green-700 text-center'
                      >
                        عرض تفاصيل الطلب
                      </Link>
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
        ) : null}
      </section>
    </Layout>
  )
}

export default SupplierDashboard

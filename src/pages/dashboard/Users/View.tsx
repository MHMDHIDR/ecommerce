import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'
import { LoadingPage, LoadingSpinner } from '@/components/Loading'
import { AcceptBtn, DeleteBtn, RejectBtn } from '@/components/TableActions'
import Modal from '@/components/Modal'
import { Loading } from '@/components/Icons/Status'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { useAxios } from '@/hooks/useAxios'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useEventListener from '@/hooks/useEventListener'
import useAuth from '@/hooks/useAuth'
import { createLocaleDateString } from '@/utils/convertDate'
import goTo from '@/utils/goTo'
import { removeSlug } from '@/utils/slug'
import notify from '@/utils/notify'
import { AppSettingsProps, UserType } from '@/types'
import { API_URL, TIME_TO_EXECUTE, USER_DATA } from '@/constants'
import { getCookies } from '@/utils/cookies'
import { parseJson, stringJson } from '@/utils/jsonTools'
import NavMenu from '@/components/NavMenu'

const ViewUsers = () => {
  const DOCUMENT_TITLE = 'المستخدمين'
  useDocumentTitle(DOCUMENT_TITLE)
  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)

  const { loading: loadingAuth, userData, isAuth } = useAuth()
  const { type } = !loadingAuth ? userData : parseJson(getLocalStorageUser())[0]

  const accountType = parseJson(getLocalStorageUser())[0].type ?? type

  const token = getCookies()

  const [actionUserId, setActionUserId] = useState('')
  const [actionUserName, setActionUserName] = useState('')
  const [actionUserType, setActionUserType] = useState('')
  const [eventState, setEventState] = useState('')
  const [isActionDone, setIsActionDone] = useState(null)
  const [actionMsg, setActionMsg] = useState('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<UserType[]>([USER_DATA])

  const { response, loading } = useAxios({
    url: `/users`,
    headers: stringJson({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    })
  })

  useEffect(() => {
    response && setUsers(response)
  }, [response])

  useEventListener('click', (e: any) => {
    switch (e.target.id) {
      case 'acceptBtn':
      case 'rejectBtn':
      case 'deleteBtn': {
        setActionUserId(e.target.dataset.id)
        setActionUserName(removeSlug(e.target.dataset.name))
        setActionUserType(e.target.dataset.type)
        setEventState(e.target.dataset.status)
        setModalLoading(true)
        break
      }
      case 'confirm': {
        eventState === 'reject' || eventState === 'accept'
          ? handleUserStatus(actionUserId, actionUserType)
          : eventState === 'delete'
          ? handleDeleteUser(actionUserId, actionUserType)
          : setModalLoading(false)
        break
      }
      case 'cancel': {
        setModalLoading(false)
        break
      }

      default: {
        setModalLoading(false)
        break
      }
    }
  })

  const handleDeleteUser = async (id: string, type: string) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        data: { type },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const { userDeleted, message } = response.data
      setIsActionDone(userDeleted)
      setActionMsg(message)
      //Remove waiting modal
      setTimeout(() => {
        setModalLoading(false)
      }, 300)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUserStatus = async (id: string, type: string) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      const response = await axios.patch(
        `${API_URL}/users/${id}`,
        { type, status: eventState },
        { headers }
      )

      const { userUpdated, message } = response.data
      setIsActionDone(userUpdated)
      setActionMsg(message)
      //Remove waiting modal
      setTimeout(() => {
        setModalLoading(false)
      }, 300)
    } catch (err) {
      console.error(err)
    }
  }

  return loadingAuth ? (
    <LoadingPage />
  ) : isAuth && accountType !== 'admin' ? (
    <ModalNotFound />
  ) : (
    <Layout>
      <section className='container overflow-x-auto px-5 rtl mx-auto max-w-6xl h-full mb-20'>
        <div className='hidden'>
          {isActionDone === 1
            ? notify({
                type: 'success',
                msg: actionMsg,
                reloadIn: TIME_TO_EXECUTE,
                reloadTo: goTo('users')
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
              eventState === 'reject' ? 'حظر' : eventState === 'delete' ? 'حذف' : 'تفعيل'
            } ${actionUserName} ؟ لا يمكن التراجع عن هذا القرار`}
            ctaConfirmBtns={[
              eventState === 'reject' ? 'حظر' : eventState === 'delete' ? 'حذف' : 'تفعيل',
              'الغاء'
            ]}
          />
        )}
        <h2 className='text-xl text-center my-16'>{DOCUMENT_TITLE}</h2>
        <table className='w-full bg-white dark:bg-gray-600 text-xs text-gray-900 dark:text-white text-center rounded-lg border border-gray-200 dark:border-gray-900 shadow-md dark:shadow-gray-900'>
          <thead className='bg-gray-50 dark:bg-gray-700'>
            <tr>
              <th className='py-2'>الرقم</th>
              <th className='py-2'>الصورة</th>
              <th className='py-2'>الإســـــــــــم</th>
              <th className='py-2'>اسم المستخدم</th>
              <th className='py-2'>الصلاحية</th>
              <th className='py-2'>حالة الحساب</th>
              <th className='py-2'>تاريخ إنشاء الحساب</th>
              <th className='py-2'>الإجراء</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-500 border-t border-gray-100 dark:border-gray-500'>
            {loading ? (
              <tr>
                <td colSpan={100} className='p-5'>
                  <LoadingSpinner title='جار البحث عن المستخدمين...' />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users?.map((user: UserType, idx: number) => (
                <tr className='hover:bg-gray-50 dark:hover:bg-gray-700' key={user.id}>
                  <td>
                    <span>{idx + 1}</span>
                  </td>
                  <td>
                    <img
                      loading='lazy'
                      src={user.avatarUrl}
                      alt={user.username}
                      height={36}
                      width={36}
                      className='object-cover rounded-lg shadow-md h-9 w-9'
                    />
                  </td>
                  <td className='min-w-[13rem]'>
                    {user.firstname || user.lastname
                      ? user.firstname + ' ' + user.lastname
                      : user.username}
                  </td>
                  <td className='min-w-[10rem]'>{user.username}</td>
                  <td>
                    <span className='inline-block min-w-max font-bold'>
                      {user.type === 'admin'
                        ? 'مدير'
                        : user.type === 'supplier'
                        ? 'تاجر'
                        : user.type === 'user'
                        ? 'مستخدم'
                        : user.type}
                    </span>
                  </td>
                  <td className='min-w-[5rem]'>
                    <span
                      className={`inline-flex items-center gap-1 min-w-max rounded-full px-2 py-1 text-xs ${
                        user.status === 'active'
                          ? 'text-green-600 bg-green-50'
                          : user.status === 'block'
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-600 bg-gray-50'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-600'
                            : user.status === 'block'
                            ? 'bg-red-600'
                            : 'bg-gray-600'
                        }`}
                      />
                      {user.status === 'active'
                        ? 'مفعل'
                        : user.status === 'block'
                        ? 'محظور'
                        : 'في انتظار الادارة'}
                    </span>
                  </td>
                  <td className='min-w-[13rem]'>
                    <span>{createLocaleDateString(user.registerDate)}</span>
                  </td>
                  <td>
                    <NavMenu>
                      <DeleteBtn id={user.id} itemName={user.username} type={user.type} />
                      {user.status === 'block' ? (
                        <AcceptBtn
                          id={user.id}
                          itemName={user.username}
                          type={user.type}
                          label='تفعيل'
                        />
                      ) : (
                        <RejectBtn
                          id={user.id}
                          itemName={user.username}
                          type={user.type}
                          label='حظر'
                        />
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
                      عفواً، لم يتم العثور على مستخدمين
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}

export default ViewUsers

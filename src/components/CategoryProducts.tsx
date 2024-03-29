import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import NoItems from './NoItems'
import Icon404 from './Icons/Icon404'
import { HeartUnfilled, HeartFilled } from './Icons/HeartIcon'
import { AppSettingsProps, ProductProps, catchResponse, WishlistProps } from '@/types'
import { removeSlug } from '@/utils/slug'
import { parseJson, stringJson } from '@/utils/jsonTools'
import notify from '@/utils/notify'
import { getCookies } from '@/utils/cookies'
import LazyImage from './LazyImage'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import useAuth from '@/hooks/useAuth'
import { useAxios } from '@/hooks/useAxios'
import { API_URL, USER_DATA } from '@/constants'
import { LoadingPage } from './Loading'

const CategoryProducts = ({
  category,
  products
}: {
  category?: string
  products: ProductProps[]
}) => {
  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const token = getCookies()
  const { userData, isAuth, userType, loading: loadingAuth } = useAuth()
  const { id: userId } = !userData
    ? getLocalStorageUser()
      ? parseJson(getLocalStorageUser()) ?? parseJson(getLocalStorageUser())[0]
      : USER_DATA
    : userData

  const [addedToWishlistStatus, setAddedToWishlistStatus] = useState<any>(null)
  const [addedToWishlistMsg, setAddedToWishlistMsg] = useState<string>('')
  const [deletedFromWishlistStatus, setDeletedFromWishlistStatus] = useState<any>(null)
  const [deletedFromWishlistMsg, setDeletedFromWishlistMsg] = useState<string>('')
  const [currentWishlistItems, setCurrentWishlistItems] = useState<WishlistProps[]>([
    { userId: '', productId: '', createDate: '' }
  ])

  const {
    response,
    loading
  }: { response: WishlistProps[] | null; loading: boolean | null } = !userType
    ? { response: null, loading: null }
    : useAxios({
        url: `/wishlists?wishlistUserId=${userId}`,
        headers: stringJson({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      })

  useEffect(() => {
    if (response !== null) {
      setCurrentWishlistItems(response)
    }
  }, [response])

  //Add a Product Item to user's Wishlist
  const addToWishlist = async (id: string) => {
    const formData = new FormData()
    formData.append('userId', userId)

    try {
      const { data } = await axios.post(`${API_URL}/wishlists/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { itemAdded, message } = data

      setAddedToWishlistStatus(itemAdded)
      setAddedToWishlistMsg(message)
    } catch (error: any) {
      const {
        response: {
          data: { message, itemAdded }
        }
      }: catchResponse = error
      setAddedToWishlistStatus(itemAdded)
      setAddedToWishlistMsg(message)
    }
  }

  //Delete a Product Item from user's Wishlist
  const removeFromWishlist = async (id: string) => {
    try {
      const { data } = await axios.delete(`${API_URL}/wishlists/${id}`, {
        data: { userId },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      const { itemDeleted, message } = data

      setDeletedFromWishlistStatus(itemDeleted)
      setDeletedFromWishlistMsg(message)
    } catch (error: any) {
      const {
        response: {
          data: { message, itemDeleted }
        }
      }: catchResponse = error
      setDeletedFromWishlistStatus(itemDeleted)
      setDeletedFromWishlistMsg(message)
    }
  }

  const isInWishlist = (productId: string) => {
    return currentWishlistItems.some(
      (item: WishlistProps) => item.productId === productId
    )
  }

  return loadingAuth || loading ? (
    <LoadingPage />
  ) : products && products.length > 0 ? (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 my-10'>
      <div className='hidden'>
        {addedToWishlistStatus === 1
          ? notify({
              type: 'success',
              msg: addedToWishlistMsg,
              position: 'top-center'
            })
          : addedToWishlistStatus === 0
          ? notify({
              type: 'error',
              msg: deletedFromWishlistMsg,
              position: 'top-center'
            })
          : deletedFromWishlistStatus === 1
          ? notify({
              type: 'success',
              msg: deletedFromWishlistMsg,
              position: 'top-center'
            })
          : deletedFromWishlistStatus === 0
          ? notify({
              type: 'error',
              msg: deletedFromWishlistMsg,
              position: 'top-center'
            })
          : null}
      </div>

      {products?.map((product: ProductProps) => (
        <motion.div
          key={product.id}
          initial={{ x: '-10vw', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            duration: 3
          }}
          className='relative block w-fit mx-auto'
        >
          {isAuth && (
            <span
              className='absolute -right-0.5 -top-2 cursor-pointer p-2 bg-gray-50 rounded-full group z-10'
              onClick={() => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id)
                } else {
                  addToWishlist(product.id)
                }
              }}
            >
              {isInWishlist(product.id) ? (
                <HeartFilled className='w-5 h-5 fill-red-300 group-hover:fill-red-400' />
              ) : (
                <HeartUnfilled className='w-5 h-5 fill-red-500 group-hover:scale-110 transition-transform' />
              )}
            </span>
          )}
          <Link
            to={`/product/${product?.id}`}
            className='block sm:max-w-[10rem] lg:max-w-xs'
          >
            <div className='h-40 w-40'>
              <LazyImage
                width={160}
                height={160}
                className='h-full w-full rounded-lg object-cover'
                src={product?.imgUrl || '/assets/img/logo.png'}
                alt={removeSlug(product?.itemName)}
              />
            </div>
            <span className='absolute hidden top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
              تخفيض
            </span>
            <div className='text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100 text-center mt-3'>
              {removeSlug(product?.itemName) || category}
              <div className='flex justify-center items-center gap-x-2 mt-1'>
                <span className='text-sm font-bold text-gray-800 dark:text-gray-100'>
                  {product?.currentPrice} ج.س
                </span>
                {product?.currentPrice < product?.oldPrice && (
                  <span className='text-xs text-gray-800 dark:text-gray-100 line-through'>
                    {product?.oldPrice} ج.س
                  </span>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  ) : (
    <NoItems
      icon={<Icon404 className='md:w-48 md:h-48' />}
      msg='عفواً، لم يتم العثور على منتجات في المتجر'
      links={[{ to: '/', label: 'الصفحة الرئيسية' }]}
    />
  )
}
export default CategoryProducts

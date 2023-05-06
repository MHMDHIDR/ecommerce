import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useAxios } from '@/hooks/useAxios'
import { useCart } from '@/contexts/CartContext'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import abstractText from '@/utils/abstractText'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { getCookies } from '@/utils/cookies'
import { AppSettingsProps, Item, WishlistProps } from '@/types'
import Controls from '../Cart/Controls'
import { isSmallScreen, PRODUCT } from '@/constants'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import { CartIconLined } from '@/components/Icons/CartIcon'
import SearchBar from '@/components/SearchBar'
import BackButton from '@/components/Icons/BackButton'
import LazyImage from '@/components/LazyImage'

const Favourites = () => {
  useDocumentTitle('قائمة المفضلة')

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const token = getCookies()
  const { id: userId } = parseJson(getLocalStorageUser())[0]

  const { items, addItem, inCart } = useCart()

  const [currentWishlistItems, setCurrentWishlistItems] = useState<WishlistProps[]>([
    { userId: '', productId: '', createDate: '' }
  ])

  const { response, loading } = useAxios({
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

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container px-5 mx-auto rtl mb-20 max-w-6xl h-full'>
        <div className='flex justify-between gap-x-5 items-center'>
          <SearchBar className='my-7' />
          {isSmallScreen && <BackButton to='/profile' className='w-8 h-8' />}
        </div>

        <h1 className='font-bold mb-3'>قائمة المفضلة</h1>
        <div className='flex flex-col gap-y-3'>
          {currentWishlistItems.map((item: WishlistProps) => {
            const alreadyAdded = inCart(item.productId)

            return (
              <div
                key={item.productId}
                className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white dark:bg-gray-700 px-2 shadow-md'
              >
                <LazyImage
                  className='h-16 w-16 rounded-lg object-cover'
                  src={PRODUCT(item.productId).imgUrl}
                  alt={PRODUCT(item.productId).itemName}
                />

                <div className='py-2 w-full'>
                  <Link to={`/product/${item.productId}`}>
                    <h5 className='text-md font-semibold text-gray-800 dark:text-gray-50'>
                      {PRODUCT(item.productId).itemName}
                    </h5>
                    <p className='text-sm text-gray-600 dark:text-gray-50'>
                      {abstractText(PRODUCT(item.productId).description, 30)}
                    </p>
                  </Link>
                  <div className='flex justify-between mt-1'>
                    <span className='text-md font-bold text-gray-800 dark:text-gray-50'>
                      {PRODUCT(item.productId).currentPrice} ج.س
                    </span>
                    {alreadyAdded ? (
                      <>
                        {items
                          .filter((item: Item) => item.id === item.productId)
                          .map((item: Item) => (
                            <Controls key={item.id} item={item} />
                          ))}
                      </>
                    ) : (
                      <button
                        type='button'
                        onClick={() => addItem(PRODUCT(item.productId))}
                        className='flex text-xs items-center rounded-full bg-blue-600 py-1 px-3 text-white hover:bg-blue-700 focus:outline-none'
                      >
                        <CartIconLined className='ml-2' />
                        أضف الى السلة
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export default Favourites

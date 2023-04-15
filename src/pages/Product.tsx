import { Link, useParams } from 'react-router-dom'
import Menu from '@/components/Menu'
import BackButton from '@/components/Icons/BackButton'
import { CartIconLined } from '@/components/Icons/CartIcon'
import { ITEMS_PER_PAGE, USER_DATA, isSmallScreen } from '@/constants'
import { useCart } from '@/contexts/CartContext'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { AppSettingsProps, Item, ProductProps } from '@/types'
import Controls from './Cart/Controls'
import { useContext, useEffect, useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import useAuth from '@/hooks/useAuth'
import { LoadingPage } from '@/components/Loading'
import NoItems from '@/components/NoItems'
import Icon404 from '@/components/Icons/Icon404'
import Layout from '@/components/Layout'
import { removeSlug } from '@/utils/slug'
import { parseJson } from '@/utils/jsonTools'
import abstractText from '@/utils/abstractText'

const Product = () => {
  const { id } = useParams()
  const { items, addItem, inCart } = useCart()
  const alreadyAdded = inCart(id!)

  const { getLocalStorageUser } = useContext<AppSettingsProps>(AppSettingsContext)
  const { userData } = useAuth()
  const { type: accountType } = getLocalStorageUser()
    ? (userData ?? { type: 'user' }) || parseJson(getLocalStorageUser())[0]
    : USER_DATA

  const [product, setProduct] = useState<ProductProps>()
  const [relevantProducts, setRelevantProducts] = useState<ProductProps[]>()

  const { data, loading } = useAxios({ url: `/products/${id}` })

  const { response, loading: relevantProductsLoading } = useAxios({
    url: `/products?category=${data && data[0]?.category}`
  })

  useEffect(() => {
    if (data !== null && response !== null && response.length > 0) {
      setProduct(data[0])
      setRelevantProducts(response)
    }
  }, [data, loading, response])

  return loading || !product || relevantProductsLoading ? (
    <LoadingPage />
  ) : product ? (
    <>
      <div className='relative flex flex-col md:h-screen justify-between overflow-y-auto rtl'>
        <div className='flex gap-x-10 flex-col md:flex-row max-w-6xl mx-auto overflow-x-hidden'>
          <header>
            <BackButton to='/' className='absolute z-50 top-6 left-6' />

            {product.discount ? (
              <span className='absolute top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
                تخفيض
              </span>
            ) : null}

            <img
              className='object-contain w-80 h-80 max-w-xs mx-auto'
              src={product.imgUrl}
              alt={product.itemName}
              height={288}
              width={288}
            />
          </header>
          <main className='px-5 py-6 mt-20 pb-12 bg-white dark:bg-gray-800 rounded-tl-[2rem] rounded-tr-[2rem] -translate-y-10 flex-1 min-h-full md:max-w-6xl mx-auto w-full'>
            <h5 className='flex justify-between text-xl font-semibold tracking-tight'>
              <Link to={`/product/${id}`}>{removeSlug(product.itemName)}</Link>
            </h5>

            <div className='mt-2.5 mb-5 flex items-center'>
              <span className='ml-2 rounded bg-yellow-200 dark:text-black px-2.5 py-0.5 text-xs font-semibold'>
                {(product.rating < 1 ? 1 : product.rating).toFixed(1)}
              </span>
              {[...Array(Math.round(product.rating < 1 ? 1 : product.rating)).keys()].map(
                (_star: any, idx: number) => (
                  <svg
                    key={idx}
                    aria-hidden='true'
                    className='h-5 w-5 text-yellow-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                )
              )}
            </div>

            <div className='flex flex-col gap-y-2 pb-6'>
              <h3 className='font-bold text-lg'>الوصف</h3>
              <p className='text-gray-700 dark:text-gray-50'>{product.description}</p>
            </div>

            <div className='flex items-center justify-between'>
              <p>
                <span className='text-2xl font-bold text-gray-800 dark:text-gray-50'>
                  {product.currentPrice} ج.س
                </span>
                {product.discount ? (
                  <span className='text-sm text-gray-800 dark:text-gray-50 line-through pr-1'>
                    {product.oldPrice} ج.س
                  </span>
                ) : null}
              </p>

              {accountType === 'user' ? (
                alreadyAdded ? (
                  items
                    .filter((item: Item) => item.id === id)
                    .map((item: Item) => <Controls key={item.id} item={item} />)
                ) : (
                  <button
                    type='button'
                    onClick={() => addItem(product)}
                    className='flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm text-white hover:bg-blue-700 focus:outline-none'
                  >
                    <CartIconLined className='ml-2' />
                    أضف الى السلة
                  </button>
                )
              ) : null}
            </div>
          </main>
        </div>
        {relevantProducts && relevantProducts.length > 0 ? (
          <div className='relative transition-colors bg-gray-50 dark:bg-gray-700 rtl'>
            <h2
              className='text-lg md:text-xl pt-4 px-10 max-w-6xl mx-auto'
              aria-label='relevant products'
            >
              قد يهمك أيضاً
            </h2>
            <div className='flex gap-x-10 p-10 pb-32 md:pb-10 cursor-default select-none overflow-x-auto max-w-6xl mx-auto'>
              {relevantProducts
                .filter((product: ProductProps) => product.id !== id)
                .slice(0, ITEMS_PER_PAGE)
                .map(({ id, imgUrl, itemName }) => (
                  <Link
                    key={id}
                    className='inline-block max-w-[5rem] max-h-[5rem] min-w-[5rem]
                    md:max-w-[11rem] md:max-h-[11rem] md:min-w-[11rem]
                    '
                    to={`/product/${id}`}
                  >
                    <img
                      loading='lazy'
                      src={imgUrl}
                      className='w-full h-full rounded-xl'
                      alt={removeSlug(itemName)}
                      title={removeSlug(itemName)}
                      width={176}
                      height={176}
                    />
                    <span className='inline-block w-full text-center'>
                      {removeSlug(abstractText(itemName, 10))}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        ) : null}
      </div>

      {isSmallScreen && <Menu />}
    </>
  ) : (
    <Layout>
      <NoItems
        className='mt-24'
        icon={<Icon404 />}
        msg={'عفواً! ... لم يتم العثور على المنتج الذي تبحث عنه، يمكنك العودة بالضغط على'}
        links={[{ to: '/', label: 'الصفحة الرئيسية' }]}
      />
    </Layout>
  )
}

export default Product

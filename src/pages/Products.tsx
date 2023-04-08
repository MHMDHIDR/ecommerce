import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import Search from '@/components/Search'
import Filter from '@/components/Icons/Filter'
import Arrow from '@/components/Icons/Arrow'
import CategoryProducts from '@/components/CategoryProducts'
import { isSmallScreen, PRODUCT } from '@/constants'
import abstractText from '@/utils/abstractText'
import { ProductProps } from '@/types'
import { useAxios } from '@/hooks/useAxios'

const Home = () => {
  useDocumentTitle('المنتجات')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const [products, setProducts] = useState<ProductProps[]>([PRODUCT('1')])
  const { response, loading } = useAxios({ url: `/products?status=open` })

  useEffect(() => {
    if (response !== null) setProducts(response)
  }, [response])

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container px-5 mx-auto h-full max-w-6xl'>
        <main className='rtl'>
          <div className='flex justify-between gap-x-5 items-center'>
            <Search />
            <Filter
              className='w-6 h-6 min-w-fit dark:fill-white hover:cursor-pointer'
              onClick={() => setIsFilterOpen(prev => !prev)}
            />
          </div>

          <div>
            <h2 className='my-3 font-bold'>الأكثر رواجاً</h2>
            <Link
              to={`/product/${PRODUCT('1').id}`}
              className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white dark:bg-gray-700 px-1.5 shadow-md'
            >
              <img
                className='h-16 w-16 rounded-lg object-cover'
                src={PRODUCT('1').imgUrl}
                alt={PRODUCT('1').itemName}
              />
              <div className='py-2'>
                <h5 className='text-md font-semibold text-gray-800 dark:text-gray-50'>
                  {PRODUCT('1').itemName}
                </h5>
                <p className='text-sm text-gray-600 dark:text-gray-50'>
                  {abstractText(PRODUCT('1').description, isSmallScreen ? 45 : 200)}
                </p>
                <span className='text-md font-bold text-gray-800 dark:text-gray-50'>
                  {PRODUCT('1').currentPrice} ج.س
                </span>
              </div>
              <span className='flex items-center rounded-md bg-gray-800 dark:bg-gray-200 p-2 mr-auto'>
                <Arrow className='fill-white dark:fill-gray-800' />
              </span>
            </Link>
          </div>

          <CategoryProducts category={'جميع المنتجات'} products={products} />
        </main>
      </section>
    </Layout>
  )
}

export default Home

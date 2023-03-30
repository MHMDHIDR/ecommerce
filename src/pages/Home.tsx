import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import Search from '@/components/Search'
import Filter from '@/components/Icons/Filter'
import Arrow from '@/components/Icons/Arrow'
import CategoryProducts from '@/components/CategoryProducts'
import { CATEGORIES, isSmallScreen, PRODUCT } from '@/constants'
import abstractText from '@/utils/abstractText'

const Home = () => {
  const DOCUMENT_TITLE = 'الرئيسية'
  useDocumentTitle(DOCUMENT_TITLE)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto h-full max-w-6xl'>
          <header className='rtl mb-3'>
            <h1 className='text-2xl font-bold'>مرحبا،</h1>
            <span>معك في كل وقت</span>
          </header>
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
                {isSmallScreen && (
                  <span className='flex items-center rounded-md bg-gray-800 dark:bg-gray-200 p-2 mr-auto'>
                    <Arrow className='fill-white dark:fill-gray-800' />
                  </span>
                )}
              </Link>
            </div>

            <div className='flex flex-col'>
              <Link className='my-3 font-bold' to={'categories'}>
                التصنيفات
              </Link>
              <ul className='flex gap-x-3 overflow-x-auto'>
                {CATEGORIES.map(({ ar_label }: { ar_label: string }, idx: number) => (
                  <li
                    key={idx}
                    className={`border text-sm rounded-full py-0.5 px-3 cursor-pointer
                              bg-gray-100 dark:bg-gray-800
                              border-gray-800 dark:border-gray-100
                              text-gray-800 dark:text-gray-100
                              focus:bg-gray-800 dark:focus:bg-gray-100
                              focus:text-gray-100 dark:focus:text-gray-800
                              hover:bg-gray-800 dark:hover:bg-gray-100
                              hover:text-gray-100 dark:hover:text-gray-800
                    `}
                    onClick={e =>
                      setSelectedCategory((e.target as HTMLElement).textContent!)
                    }
                  >
                    {ar_label}
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex items-center justify-between -mb-6'>
              <h2 className='my-3 font-bold'>الأعلى مبيعاً</h2>
              <Link to={`/products`} className='text-sm text-gray-700 dark:text-gray-200'>
                عرض الكل
              </Link>
            </div>
            <CategoryProducts category={selectedCategory || 'جميع التصنيفات'} />
          </main>
        </section>
      </Layout>
    </Suspense>
  )
}

export default Home

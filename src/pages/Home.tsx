import { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import Search from '../components/Search'
import Filter from '../components/Icons/Filter'
import Arrow from '../components/Icons/Arrow'
import CategoryProducts from '../components/CategoryProducts'

const Home = () => {
  useDocumentTitle('الرئيسية')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto h-full'>
          <header className='rtl mb-3'>
            <h1 className='text-2xl font-bold'>مرحبا،</h1>
            <span>معك في كل وقت</span>
          </header>
          <main className='rtl'>
            <div className='flex justify-between gap-x-5 items-center'>
              <Search small={true} />
              <Filter className='w-6 h-6 min-w-fit' />
            </div>

            <div>
              <h2 className='my-3 font-bold'>الأكثر رواجاً</h2>
              <Link
                to={`/#`}
                className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white px-2 shadow-md'
              >
                <img
                  className='h-16 w-16 rounded-lg object-cover'
                  src='https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                  alt='product image'
                />
                <div className='py-2'>
                  <h5 className='text-md font-semibold text-gray-800'>حذاء سوبر 5000</h5>
                  <p className='text-sm text-gray-600'>حذاء رياضي ذو جودة عالية</p>
                  <span className='text-md font-bold text-gray-800'>249 ج.س</span>
                </div>
                <span className='flex items-center rounded-md bg-gray-800 p-2 mr-auto'>
                  <Arrow className='fill-white' />
                </span>
              </Link>
            </div>

            <div className='flex flex-col'>
              <h2 className='my-3 font-bold'>التصنيفات</h2>
              <ul className='flex gap-x-3 overflow-x-auto'>
                <li
                  className='border text-sm rounded-full py-0.5 px-3 border-gray-800 hover:bg-gray-800 dark:border-gray-200 dark:bg-gray-200 focus:bg-gray-800 focus:text-white hover:text-white'
                  onClick={e =>
                    setSelectedCategory((e.target as HTMLElement).textContent!)
                  }
                >
                  الملابس
                </li>
                <li
                  className='border text-sm rounded-full py-0.5 px-3 border-gray-800 hover:bg-gray-800 dark:border-gray-200 dark:bg-gray-200 focus:bg-gray-800 focus:text-white hover:text-white'
                  onClick={e =>
                    setSelectedCategory((e.target as HTMLElement).textContent!)
                  }
                >
                  الجاكيتات
                </li>
                <li
                  className='border text-sm rounded-full py-0.5 px-3 border-gray-800 hover:bg-gray-800 dark:border-gray-200 dark:bg-gray-200 focus:bg-gray-800 focus:text-white hover:text-white'
                  onClick={e =>
                    setSelectedCategory((e.target as HTMLElement).textContent!)
                  }
                >
                  الجينز
                </li>
                <li
                  className='border text-sm rounded-full py-0.5 px-3 border-gray-800 hover:bg-gray-800 dark:border-gray-200 dark:bg-gray-200 focus:bg-gray-800 focus:text-white hover:text-white'
                  onClick={e =>
                    setSelectedCategory((e.target as HTMLElement).textContent!)
                  }
                >
                  الأحذية
                </li>
                <li
                  className='border text-sm rounded-full py-0.5 px-3 border-gray-800 hover:bg-gray-800 dark:border-gray-200 dark:bg-gray-200 focus:bg-gray-800 focus:text-white hover:text-white'
                  onClick={e =>
                    setSelectedCategory((e.target as HTMLElement).textContent!)
                  }
                >
                  النظارات
                </li>
              </ul>
            </div>
            <div className='flex items-center justify-between -mb-6'>
              <h2 className='my-3 font-bold'>الأعلى مبيعاً</h2>
              <Link to={`#`} className='text-sm text-gray-700 dark:text-gray-200'>
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

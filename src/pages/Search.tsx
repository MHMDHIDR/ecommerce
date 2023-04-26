import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useAxios } from '@/hooks/useAxios'
import { ProductProps } from '@/types'
import abstractText from '@/utils/abstractText'
import { isSmallScreen } from '@/constants'
import { removeSlug } from '@/utils/slug'
import { LoadingPage } from '@/components/Loading'
import Layout from '@/components/Layout'
import NoItems from '@/components/NoItems'
import SearchBar from '@/components/SearchBar'
import Filter from '@/components/Icons/Filter'
import Icon404 from '@/components/Icons/Icon404'
import LazyImage from '@/components/LazyImage'

const Search = () => {
  useDocumentTitle('البحث')
  const { query: SearchQuery } = useParams()

  const [searchResults, setRearchResults] = useState([])
  const [resultsCount, setResultsCount] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const { response, data, loading } = useAxios({
    url: `/products?status=open&SearchQuery=${SearchQuery}`
  })

  useEffect(() => {
    if (response !== null) {
      setRearchResults(response)
      setResultsCount(data.itemsCount)
    }
  }, [response])

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container h-full px-5 mx-auto rtl mb-24 max-w-6xl'>
        <div className='flex justify-between gap-x-5 items-center'>
          <SearchBar />
          <Filter
            className='w-6 h-6 min-w-fit dark:fill-white hover:cursor-pointer'
            onClick={() => setIsFilterOpen(prev => !prev)}
          />
        </div>

        <h2 className='my-3 font-bold'>نتائج البحث عن {SearchQuery}</h2>
        <small className='my-3'>
          تم العثور على {resultsCount} {resultsCount > 2 ? 'نتائج' : 'نتيجة'}
        </small>

        {searchResults && resultsCount > 0 ? (
          searchResults.map((item: ProductProps) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className='flex items-center gap-x-3 overflow-hidden rounded-lg bg-white dark:bg-gray-700 px-1.5 shadow-md my-10 hover:-translate-x-2 transition-transform duration-300'
            >
              <LazyImage
                className='h-16 w-16 rounded-lg object-cover'
                src={item.imgUrl}
                alt={item.itemName}
              />
              <div className='py-2'>
                <h5 className='text-md font-semibold text-gray-800 dark:text-gray-50'>
                  {removeSlug(item.itemName)}
                </h5>
                <p className='text-sm text-gray-600 dark:text-gray-50'>
                  {abstractText(item.description, isSmallScreen ? 45 : 200)}
                </p>
                <span className='text-md font-bold text-gray-800 dark:text-gray-50'>
                  {item.currentPrice} ج.س
                </span>
              </div>
            </Link>
          ))
        ) : (
          <NoItems
            msg={`عفواً لم يتم العثور على ${SearchQuery}، حاول البحث عن شيء آخر`}
            className='mt-40'
            links={[
              { to: `/products`, label: 'تصفح المنتجات' },
              { to: `/`, label: 'الصفحة الرئيسية' }
            ]}
            icon={<Icon404 className='md:w-48 md:h-48' />}
          />
        )}
      </section>
    </Layout>
  )
}

export default Search

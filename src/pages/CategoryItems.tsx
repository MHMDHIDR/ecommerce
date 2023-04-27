import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCT, isSmallScreen } from '@/constants'
import { useAxios } from '@/hooks/useAxios'
import { ProductProps } from '@/types'
import CategoryProducts from '@/components/CategoryProducts'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { LoadingPage } from '@/components/Loading'
import SearchBar from '@/components/SearchBar'

const CategoryItems = () => {
  const { id: categoryId } = useParams()

  const [products, setProducts] = useState<ProductProps[]>([PRODUCT('1')])

  const { response, loading } = useAxios({
    url: `/products?status=open&category=${categoryId}`
  })

  useEffect(() => {
    if (response !== null) {
      setProducts(response)
      return () => {
        setProducts([PRODUCT('1')])
      }
    }
  }, [response])

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container px-7 mx-auto h-full my-10 flex flex-col rtl mb-24 max-w-6xl'>
        <div className='flex gap-x-7 items-center justify-between'>
          <SearchBar />
          {isSmallScreen && <BackButton to='/' className='w-8 h-8' />}
        </div>
        <CategoryProducts products={products!} />
      </section>
    </Layout>
  )
}

export default CategoryItems

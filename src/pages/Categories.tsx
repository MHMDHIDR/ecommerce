import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryProducts from '@/components/CategoryProducts'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { LoadingPage } from '@/components/Loading'
import Search from '@/components/Search'
import { CATEGORIES, PRODUCT, isSmallScreen } from '@/constants'
import { useAxios } from '@/hooks/useAxios'
import { ProductProps } from '@/types'

const Categories = () => {
  const { name } = useParams()
  //look for [ name ] in database if available then show the
  //products inside the item page

  const [products, setProducts] = useState<ProductProps[]>([PRODUCT('1')])
  const { response, loading } = useAxios({ url: `/products?status=open` })

  useEffect(() => {
    if (response !== null) setProducts(response)
  }, [response])

  return loading ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container px-7 mx-auto my-10 flex flex-col rtl mb-24 max-w-6xl'>
        <div className='flex gap-x-7 items-center justify-between'>
          <Search />
          {isSmallScreen && <BackButton to='/' className='w-8 h-8' />}
        </div>
        {name ? (
          <CategoryProducts name={name} products={products} />
        ) : (
          <div className='flex flex-wrap justify-center mt-5 gap-3 md:gap-12'>
            {CATEGORIES.map(
              (
                {
                  ar_label,
                  en_label,
                  itemCount
                }: { ar_label: string; en_label: string; itemCount: number },
                idx: number
              ) => (
                <Link
                  key={idx}
                  to={en_label}
                  className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 md:h-60 rounded-2xl hover:-translate-y-2'
                >
                  <div
                    className={`flex items-center pr-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-70 bg-[url("/assets/img/logo.png")] bg-cover bg-[left]`}
                  >
                    <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                      <span>{ar_label}</span>
                      <span>{itemCount} منتج</span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Categories

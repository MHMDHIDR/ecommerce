import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryProducts from '@/components/CategoryProducts'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { LoadingPage } from '@/components/Loading'
import SearchBar from '@/components/SearchBar'
import { PRODUCT, isSmallScreen } from '@/constants'
import { useAxios } from '@/hooks/useAxios'
import { CategoryProps, ProductProps } from '@/types'
import { removeSlug } from '@/utils/slug'

const Categories = () => {
  const { name } = useParams()
  //look for [ name ] in database if available then show the
  //products inside the item page

  const [products, setProducts] = useState<ProductProps[]>([PRODUCT('1')])
  const [categories, setCategories] = useState<CategoryProps[] | null>(null)

  const { response: responseCategories, loading: loadingCategories } = useAxios({
    url: `/categories`
  })
  const { response, loading } = useAxios({ url: `/products?status=open` })

  useEffect(() => {
    if (response !== null && responseCategories !== null) {
      setCategories(
        responseCategories.map(
          ({ categoryNameEn, categoryNameAr, imgUrl }: CategoryProps) => ({
            categoryNameEn,
            categoryNameAr,
            imgUrl
          })
        )
      )
      setProducts(response)
    }
  }, [response, responseCategories])

  return loading || loadingCategories ? (
    <LoadingPage />
  ) : (
    <Layout>
      <section className='container px-7 mx-auto h-full my-10 flex flex-col rtl mb-24 max-w-6xl'>
        <div className='flex gap-x-7 items-center justify-between'>
          <SearchBar />
          {isSmallScreen && <BackButton to='/' className='w-8 h-8' />}
        </div>
        {name ? (
          <CategoryProducts name={name} products={products} />
        ) : (
          <div className='flex flex-wrap justify-center mt-16 gap-3 md:gap-12'>
            {categories &&
              categories.map(
                (
                  { categoryNameEn, categoryNameAr, imgUrl }: CategoryProps,
                  idx: number
                ) => (
                  <Link
                    key={idx}
                    to={categoryNameEn}
                    className='block relative overflow-hidden duration-300 bg-cover w-80 h-24 md:h-60 rounded-2xl group'
                  >
                    <span className='flex justify-center w-full absolute bg-black dark:bg-white dark:text-black opacity-80 py-1 group-hover:py-28 duration-[inherit]'>
                      {removeSlug(categoryNameAr)}
                    </span>
                    <img
                      src={imgUrl}
                      height={96}
                      width={320}
                      alt={categoryNameEn}
                      className='w-full h-full'
                    />
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

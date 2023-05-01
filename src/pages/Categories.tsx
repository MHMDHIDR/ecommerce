import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isSmallScreen } from '@/constants'
import { useAxios } from '@/hooks/useAxios'
import { CategoryProps } from '@/types'
import { removeSlug } from '@/utils/slug'
import BackButton from '@/components/Icons/BackButton'
import Layout from '@/components/Layout'
import { LoadingPage } from '@/components/Loading'
import SearchBar from '@/components/SearchBar'
import LazyImage from '@/components/LazyImage'

const Categories = () => {
  const [categories, setCategories] = useState<CategoryProps[] | null>(null)

  const { response, loading } = useAxios({ url: `/categories?hasProducts=true` })

  useEffect(() => {
    if (response !== null) {
      setCategories(
        response.map(({ id, categoryNameEn, categoryNameAr, imgUrl }: CategoryProps) => ({
          id,
          categoryNameEn,
          categoryNameAr,
          imgUrl
        }))
      )
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
        <div className='flex flex-wrap justify-center mt-16 gap-3 md:gap-12'>
          {categories &&
            categories.map(
              (
                { id, categoryNameEn, categoryNameAr, imgUrl }: CategoryProps,
                idx: number
              ) => (
                <Link
                  key={idx}
                  to={`/category/${id}`}
                  className='block relative overflow-hidden duration-300 bg-cover w-80 h-24 md:h-60 rounded-2xl group'
                >
                  <span className='flex justify-center w-full absolute text-white bg-black dark:text-black dark:bg-white opacity-70 font-black py-1 group-hover:py-28 duration-[inherit]'>
                    {removeSlug(categoryNameAr)}
                  </span>
                  <LazyImage
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
      </section>
    </Layout>
  )
}

export default Categories

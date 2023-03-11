import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import CategoryProducts from '../components/CategoryProducts'
import BackButton from '../components/Icons/BackButton'
import Layout from '../components/Layout'
import { LoadingPage } from '../components/Loading'
import Search from '../components/Search'
import { CATEGORIES } from '../constants'

const Categories = () => {
  const { name } = useParams()
  //look for [ name ] in database if available then show the
  //products inside the item page

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-7 mx-auto my-10 flex flex-col rtl mb-24'>
          <div className='flex gap-x-7 items-center justify-between'>
            <Search small={true} />
            <Link to={`/`} className='w-8 h-8 min-w-fit'>
              <BackButton className='w-8 h-8' />
            </Link>
          </div>
          {name ? (
            <CategoryProducts name={name} />
          ) : (
            <div className='flex flex-wrap justify-center mt-5 gap-3 xl:justify-between'>
              {CATEGORIES.map(
                (
                  {
                    label,
                    to,
                    itemCount
                  }: { label: string; to: string; itemCount: number },
                  idx: number
                ) => (
                  <Link
                    key={idx}
                    to={to}
                    className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 rounded-2xl hover:-translate-y-2'
                  >
                    <div
                      className={`flex items-center pr-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("/assets/img/logo.png")] bg-cover bg-[left]`}
                    >
                      <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                        <span>{label}</span>
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
    </Suspense>
  )
}

export default Categories

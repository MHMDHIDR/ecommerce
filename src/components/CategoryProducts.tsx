import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAxios from '@/hooks/useAxios'
import { LoadingPage } from './Loading'
import NoItems from './NoItems'
import Icon404 from './Icons/Icon404'
import { ProductProps } from '@/types'
import { removeSlug } from '@/utils/functions/slug'
import { PRODUCT } from '@/constants'

const CategoryProducts = ({ name, category }: { name?: string; category?: string }) => {
  const [products, setProducts] = useState<ProductProps[]>([PRODUCT('1')])
  const { response, loading } = useAxios({ url: `/products` })

  useEffect(() => {
    response && setProducts(response)
  }, [response])

  return (
    <>
      <h2 className='my-5'>{name || category}</h2>

      {loading ? (
        <LoadingPage />
      ) : products.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4'>
          {products?.map((product: ProductProps) => (
            <motion.div
              key={product.id}
              initial={{ x: '-10vw', opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                duration: 3
              }}
            >
              <div className='relative sm:max-w-[10rem] lg:max-w-xs w-fit overflow-hidden mx-auto'>
                <Link to={`/product/${product?.id}`} className='block sm:h-40 sm:w-40'>
                  <img
                    className='h-full w-full rounded-lg object-cover'
                    src={product?.imgUrl || '/assets/img/logo.png'}
                    alt={removeSlug(product?.itemName)}
                  />
                </Link>
                <span className='absolute hidden top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
                  تخفيض
                </span>
                <div className='text-center mt-1'>
                  <Link
                    to='#'
                    className='text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100'
                  >
                    {removeSlug(product?.itemName) || category}
                  </Link>
                  <div className='flex justify-center items-center gap-x-2 mt-1'>
                    <span className='text-sm font-bold text-gray-800 dark:text-gray-100'>
                      {product?.currentPrice} ج.س
                    </span>
                    {product?.currentPrice < product?.oldPrice && (
                      <span className='text-xs text-gray-800 dark:text-gray-100 line-through'>
                        {product?.oldPrice} ج.س
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <NoItems
          icon={<Icon404 className='md:w-48 md:h-48' />}
          msg='عفواً، لم يتم العثور على منتجات في المتجر'
          links={[{ to: '../', label: 'الصفحة الرئيسية' }]}
        />
      )}
    </>
  )
}
export default CategoryProducts

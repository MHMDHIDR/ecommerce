import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NoItems from './NoItems'
import Icon404 from './Icons/Icon404'
import { ProductProps } from '@/types'
import { removeSlug } from '@/utils/slug'
import HeartIcon from './Icons/HeartIcon'
import LazyImage from './LazyImage'

const CategoryProducts = ({
  category,
  products
}: {
  category?: string
  products: ProductProps[]
}) => {
  const addToWishlist = (id: string) => {
    console.log(`Add ${id} item to users Wishlist`)
  }

  return (
    <>
      {products && products.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 my-10'>
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
              className='relative block w-fit mx-auto'
            >
              <span
                className='absolute right-0 -top-2 cursor-pointer p-1.5 bg-white rounded-full group z-10'
                onClick={() => addToWishlist(product?.id)}
              >
                <HeartIcon className='w-5 h-5 fill-blue-300 group-hover:fill-blue-400' />
              </span>
              <Link
                to={`/product/${product?.id}`}
                className='block sm:max-w-[10rem] lg:max-w-xs'
              >
                <div className='h-40 w-40'>
                  <LazyImage
                    width={160}
                    height={160}
                    className='h-full w-full rounded-lg object-cover'
                    src={product?.imgUrl || '/assets/img/logo.png'}
                    alt={removeSlug(product?.itemName)}
                  />
                </div>
                <span className='absolute hidden top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
                  تخفيض
                </span>
                <div className='text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100 text-center mt-3'>
                  {removeSlug(product?.itemName) || category}
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
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <NoItems
          icon={<Icon404 className='md:w-48 md:h-48' />}
          msg='عفواً، لم يتم العثور على منتجات في المتجر'
          links={[{ to: '/', label: 'الصفحة الرئيسية' }]}
        />
      )}
    </>
  )
}
export default CategoryProducts

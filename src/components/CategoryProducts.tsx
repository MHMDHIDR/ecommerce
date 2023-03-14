import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CategoryProducts = ({ name, category }: { name?: string; category?: string }) => {
  const products = [...Array(5).keys()]

  return (
    <>
      <h2 className='mt-5'>{name || category}</h2>
      <div className='grid grid-cols-2 gap-y-10 gap-x-4 place-items-center mt-10'>
        {products.map((_product: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ x: '-30vw', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              duration: 3
            }}
          >
            <div className='relative w-full max-w-xs overflow-hidden'>
              <Link to={`/product/${idx + 1}`} className='block h-40 w-40'>
                <img
                  className='h-full w-full rounded-lg object-cover'
                  src='https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                  alt='product image'
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
                  {name || category}
                </Link>
                <div className='flex justify-center items-center gap-x-2 mt-1'>
                  <span className='text-sm font-bold text-gray-800 dark:text-gray-100'>
                    249 ج.س
                  </span>
                  <span className='text-xs text-gray-800 dark:text-gray-100 line-through'>
                    299 ج.س
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}
export default CategoryProducts

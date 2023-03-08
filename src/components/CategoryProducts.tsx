import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import abstractText from '../utils/functions/abstractText'
import { removeSlug } from '../utils/functions/slug'
import Card from './Card'

const CategoryProducts = ({ name }: { name: string }) => {
  const products = [...Array(5).keys()]

  return (
    <>
      <h2 className='font-bold mt-4'>{name}</h2>
      <div className='grid grid-cols-2 gap-y-10 gap-x-2 place-items-center mt-10'>
        {products.map((_product: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ x: '50vw', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              duration: 3
            }}
          >
            <div className='relative w-full max-w-xs overflow-hidden'>
              <a href='#' className='block h-40 w-40'>
                <img
                  className='h-full w-full rounded-lg object-cover'
                  src='https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                  alt='product image'
                />
              </a>
              <span className='absolute hidden top-0 right-0 w-28 py-1 translate-y-4 translate-x-8 rotate-45 bg-blue-600 text-center text-sm text-white'>
                تخفيض
              </span>
              <div className='text-center'>
                <a href='#'>
                  <h5 className='text-sm font-semibold tracking-tight text-slate-900'>
                    {name}
                  </h5>
                </a>
                <div className='flex flex-col'>
                  <p>
                    <span className='text-sm font-bold text-slate-900'>249 ج.س </span>
                    <span className='text-xs text-slate-900 line-through'>299 ج.س </span>
                  </p>
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

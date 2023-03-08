import { removeSlug } from '../utils/functions/slug'
import Logo from './Icons/Logo'
import { cardProps } from '../types'

const Card = ({ cHeading, cDesc, cImgAlt = 'Food Card', cPrice }: cardProps) => {
  return (
    <div className='flex flex-wrap items-center justify-center max-w-xs mx-auto lg:justify-between sm:max-w-full'>
      <div className='flex flex-col flex-wrap items-center justify-center flex-1 order-1 sm:px-16'>
        {cHeading ? (
          <h3 className='inline-block pt-2 text-xl text-center text-gray-800 bg-transparent sm:mt-0 sm:pt-2 dark:text-white underline-hover'>
            {cHeading}
          </h3>
        ) : null}
        <p className='break-all'>{cDesc}</p>
        {cPrice ? <span className='text-green-800 rtl'>{cPrice + ' ج.س'}</span> : null}
      </div>
      <div
        title={removeSlug(cImgAlt)}
        className=' [--cardImgSize:9rem] min-w-[var(--cardImgSize)] max-w-[calc(var(--cardImgSize))] overflow-hidden transition-colors bg-gray-100 border border-gray-400 rounded-lg dark:bg-gray-600 min-h-[var(--cardImgSize)*2] max-h-[calc(var(--cardImgSize)*2)]'
      >
        <Logo width='28' height='28' className='mx-auto my-2' />
      </div>
    </div>
  )
}

export default Card

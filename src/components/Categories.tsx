import { Link } from 'react-router-dom'
import Search from './Search'

const Categories = () => (
  <section className='container px-10 mx-auto my-10 flex flex-col'>
    <img
      className='mb-10'
      src='/assets/img/icons/arrow.svg'
      width='32'
      height='32'
      alt='Arrow'
    />
    <Search />
    <div className='flex flex-wrap justify-center mt-5 gap-3 xl:justify-between'>
      <Link
        to={`/view/new_arrivals`}
        className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-28 rounded-2xl hover:-translate-y-2'
      >
        <h3
          className={`flex items-center justify-center h-full text-sm font-bold text-white bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("")]`}
        >
          New Arrivals
        </h3>
      </Link>

      <Link
        to={`/view/clothes/`}
        className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-28 rounded-2xl hover:-translate-y-2'
      >
        <h3
          className={`flex items-center justify-center h-full text-sm font-bold text-white bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("")]`}
        >
          Clothes
        </h3>
      </Link>

      <Link
        to={`/view/bags/`}
        className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-28 rounded-2xl hover:-translate-y-2'
      >
        <h3
          className={`flex items-center justify-center h-full text-sm font-bold text-white bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("")]`}
        >
          Bags
        </h3>
      </Link>

      <Link
        to={`/view/shoses/`}
        className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-28 rounded-2xl hover:-translate-y-2'
      >
        <h3
          className={`flex items-center justify-center h-full text-sm font-bold text-white bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("")]`}
        >
          Shoses
        </h3>
      </Link>

      <Link
        to={`/view/electronics/`}
        className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-28 rounded-2xl hover:-translate-y-2'
      >
        <h3
          className={`flex items-center justify-center h-full text-sm font-bold text-white bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("")]`}
        >
          Electronics
        </h3>
      </Link>
    </div>
  </section>
)

export default Categories

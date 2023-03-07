import { Link, useParams } from 'react-router-dom'
import CategoryProducts from '../components/CategoryProducts'
import Search from '../components/Search'

const Categories = () => {
  const { name } = useParams()
  //look for [ name ] in database if available then show the
  //products inside the item page

  return (
    <section className='container px-10 mx-auto my-10 flex flex-col rtl'>
      <div className='flex gap-x-7 items-center justify-between'>
        <Search small={true} />
        <Link to={`/`} className='w-8 h-8 min-w-fit'>
          <img
            className='mb-10'
            src='/assets/img/icons/arrow.svg'
            width='32'
            height='32'
            alt='Arrow'
          />
        </Link>
      </div>
      <h3 className='my-4'>Title: {name ?? name}</h3>
      {name ? (
        <CategoryProducts name={name} />
      ) : (
        <div className='flex flex-wrap justify-center mt-5 gap-3 xl:justify-between'>
          <Link
            to={`/new_arrivals`}
            className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 rounded-2xl hover:-translate-y-2'
          >
            <div
              className={`flex items-center pl-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("/assets/img/newarrivals.webp")] bg-cover bg-[left]`}
            >
              <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                <span>New Arrivals</span>
                <span>200 Products</span>
              </div>
            </div>
          </Link>
          <Link
            to={`/clothes`}
            className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 rounded-2xl hover:-translate-y-2'
          >
            <div
              className={`flex items-center pl-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("/assets/img/green-t-shirt.webp")] bg-cover bg-[left]`}
            >
              <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                <span className='bg-black bg-opacity-70'>Clothes</span>
                <span>200 Products</span>
              </div>
            </div>
          </Link>
          <Link
            to={`/bags`}
            className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 rounded-2xl hover:-translate-y-2'
          >
            <div
              className={`flex items-center pl-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("/assets/img/bags.webp")] bg-cover bg-[left]`}
            >
              <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                <span className='bg-black bg-opacity-70'>Bags</span>
                <span>200 Products</span>
              </div>
            </div>
          </Link>
          <Link
            to={`/shoses`}
            className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 rounded-2xl hover:-translate-y-2'
          >
            <div
              className={`flex items-center pl-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("/assets/img/shoses.webp")] bg-cover bg-[left]`}
            >
              <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                <span className='bg-black bg-opacity-70'>Shoses</span>
                <span>200 Products</span>
              </div>
            </div>
          </Link>
          <Link
            to={`/electronics`}
            className='block overflow-hidden transition-transform duration-300 bg-cover w-80 h-24 rounded-2xl hover:-translate-y-2'
          >
            <div
              className={`flex items-center pl-3 justify-left h-full text-sm font-bold bg-gray-800 md:text-base 2xl:text-xl bg-opacity-80 bg-[url("/assets/img/electronics.webp")] bg-cover bg-[left]`}
            >
              <div className='flex flex-col bg-black bg-opacity-60 px-2 py-0.5 text-white rounded'>
                <span className='bg-black bg-opacity-70'>Electronics</span>
                <span>200 Products</span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </section>
  )
}

export default Categories

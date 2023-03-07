import { Link } from 'react-router-dom'

const Product = ({ product }: any) => {
  return (
    <section className='container px-10 mx-auto my-10 flex flex-col rtl'>
      <Link to={`/`}>
        <img
          className='mb-10'
          src='/assets/img/icons/arrow.svg'
          width='32'
          height='32'
          alt='Arrow'
        />
      </Link>
      <h3>{product?.name || 'اسم المنتج'}</h3>
      <div className='flex flex-wrap justify-center mt-5 gap-2 xl:justify-between'>
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
    </section>
  )
}

export default Product

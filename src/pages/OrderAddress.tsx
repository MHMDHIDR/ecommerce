import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'
import { MAX_QUANTITY } from '../constants'
import { useCart } from '../contexts/CartContext'
import { AddBtn, MinusBtn, TrashBtn } from '../components/Icons/Controls'

const OrderAddress = () => {
  useDocumentTitle('عنوان الطلب')

  const { items, cartTotal } = useCart()

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='container px-5 mx-auto rtl mb-20 flex flex-col gap-y-7'>
          <div>
            <h1 className='font-bold mb-2'>عنوان التوصيل</h1>
            <ul className='flex flex-col justify-center border gap-x-3 p-5 rounded-xl shadow-xl overflow-hidden space-y-3'>
              <li className='flex gap-x-2'>
                <span className='font-bold'>رقم :المنزل</span>
                <span className='text-gray-700'>123</span>
              </li>
              <li className='flex gap-x-2'>
                <span className='font-bold'>الشارع:</span>
                <span className='text-gray-700'>123</span>
              </li>
              <li className='flex gap-x-2'>
                <span className='font-bold'>الحي:</span>
                <span className='text-gray-700'>123</span>
              </li>
              <li className='flex gap-x-2'>
                <span className='font-bold'>المدينة:</span>
                <span className='text-gray-700'>123</span>
              </li>
              <li className='flex gap-x-2'>
                <span className='font-bold'>رقم :الهاتف</span>
                <span className='text-gray-700'>123</span>
              </li>
            </ul>
          </div>
          <div>
            <h1 className='font-bold mb-2'>الطلبات</h1>
            {items.map((item: any) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`} //to product link using id or name [/product/:name] to make url more SEO friendly
                className='flex items-center gap-x-3 bg-white overflow-hidden rounded-xl shadow-md p-2 mb-2'
              >
                <img
                  className='h-16 w-16 rounded-lg object-cover'
                  src={item.imgUrl}
                  alt={item.name}
                />
                <div className='py-2'>
                  <h5 className='text-md font-semibold text-gray-800'>{item.name}</h5>
                  <p className='text-sm text-gray-600 truncate max-w-[25%] pl-5'>
                    {item.description}
                  </p>
                  <span className='text-md font-bold text-gray-800'>
                    {item.currentPrice} ج.س
                  </span>
                  <span className='px-2'>x</span>
                  <input
                    className='text-center w-8 bg-gray-100 p-0.5 font-bold rounded-xl'
                    type='number'
                    value={item.quantity}
                    disabled
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className='flex justify-between'>
            <span className='flex gap-x-2 items-center'>
              <sub className='text-gray-500'>السعر الاجمالي</sub>
              <span className='text-lg font-bold'>
                {cartTotal + parseInt((cartTotal * 0.1).toFixed())} ج.س
              </span>
            </span>
            <Link
              to='/payment'
              className='flex items-center justify-center rounded-full bg-blue-600 py-2.5 px-5 text-sm text-white hover:bg-gray-700 focus:outline-none'
            >
              إكمال عملية الشراء
            </Link>
          </div>
        </section>
      </Layout>
    </Suspense>
  )
}

export default OrderAddress

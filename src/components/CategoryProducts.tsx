import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import abstractText from '../utils/functions/abstractText'
import { removeSlug } from '../utils/functions/slug'
import Card from './Card'

const CategoryProducts = ({ name }: { name: string }) => {
  const products = [...Array(5).keys()]

  return (
    <div>
      <h2>CategoryProducts: {name}</h2>
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
          <Card
            cItemId={idx}
            cHeading={
              <Link to={`/product/${name}`}>
                {removeSlug(abstractText(name + ' _ ' + idx, 70))}
              </Link>
            }
            cPrice={idx}
            cCategory={name}
            cDesc={abstractText(name, 120)}
            cTags={[name]}
            cToppings={[name]}
            cImg={name}
            cImgAlt={name}
            cCtaLabel={
              //add to cart button, if item is already in cart then disable the button
              // items.find(
              //   (itemInCart: { cItemId: string }) => itemInCart.cItemId === item._id
              // ) ? (
              <div className='relative rtl min-w-fit text-white rounded-lg bg-green-800 hover:bg-green-700'>
                {/* <span className='py-0.5 px-1 pr-1.5 bg-gray-100 rounded-md absolute right-1 top-1 pointer-events-none'>
                  🛒
                </span>
                &nbsp;&nbsp;
                <span className='mr-4 text-center pointer-events-none'>
                  أضف إلى السلة
                </span> */}
                <button>+</button>
              </div>
              // ) : (
              //   <div className='relative rtl m-2 min-w-[7.5rem] text-white py-1.5 px-6 rounded-lg bg-red-800 hover:bg-red-700'>
              //   <span className='py-0.5 px-1 pr-1.5 bg-gray-100 rounded-md absolute right-1 top-1 pointer-events-none'>
              //     ❌
              //   </span>
              //   &nbsp;&nbsp;
              //   <span className='mr-4 text-center pointer-events-none'>
              //     إحذف من السلة
              //   </span>
              // </div>
              // )
            }
          />
        </motion.div>
      ))}
    </div>
  )
}
export default CategoryProducts

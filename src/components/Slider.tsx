import EmblaCarousel from '@/components/EmblaCarousel'
import { ITEMS_PER_PAGE } from '@/constants'
import { ProductProps, mediaProps } from '@/types'

const Slider = ({
  products,
  itemsCount
}: {
  products: ProductProps[]
  itemsCount: number
}) => {
  const SlidesCount = ITEMS_PER_PAGE > itemsCount ? itemsCount : ITEMS_PER_PAGE
  const slides = Array.from(Array(SlidesCount).keys())
  let media: mediaProps = []

  //push food images to media array
  products &&
    products?.map(({ id, imgUrl, itemName, currentPrice }: any) =>
      media.push({
        id,
        imgUrl,
        itemName,
        currentPrice
      })
    )

  return (
    <div className='max-w-4xl my-20 mx-auto transition-transform translate-x-0 select-none'>
      <EmblaCarousel slides={slides} media={media} />
    </div>
  )
}
export default Slider

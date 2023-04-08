import { isSmallScreen } from '@/constants'
import { MenuItem } from '@/types'
import { isActiveLink } from '@/utils/isActiveLink'

const Item = ({ item }: MenuItem) => {
  return isActiveLink(item.to) ? (
    <div className='flex justify-center items-center bg-white dark:bg-gray-900 bg-opacity-30 -mr-4 px-3 py-1 rounded-full'>
      <span className='bg-black dark:bg-gray-300 p-2 rounded-full'>
        <item.icon className='w-4 h-4 fill-gray-50 dark:fill-neutral-900' />
      </span>
      {!isSmallScreen ? (
        <span className='px-2 dark:text-gray-50'>{item.label}</span>
      ) : null}
    </div>
  ) : (
    <div className='flex justify-center items-center'>
      <span className='[&>svg]:w-5 inline-block py-1.5'>
        <item.icon className='w-5 h-5' />
      </span>
      {!isSmallScreen ? (
        <span className='px-2 dark:text-gray-50'>{item.label}</span>
      ) : null}
    </div>
  )
}
export default Item

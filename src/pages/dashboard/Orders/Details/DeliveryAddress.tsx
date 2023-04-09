import { UserType } from '@/types'

const DeliveryAddress = ({ usersData }: { usersData: UserType }) => (
  <>
    <h2 className='text-xl text-center mb-4'>عنوان التوصيل</h2>
    <ul className='flex flex-col justify-center border gap-x-3 p-5 rounded-xl shadow-xl overflow-hidden space-y-3'>
      <li className='flex gap-x-2'>
        <span className='font-bold'>اسم العميل: </span>
        <span className='text-gray-700 dark:text-gray-50'>
          {usersData?.firstname} {usersData?.lastname}
        </span>
      </li>
      <li className='flex gap-x-2'>
        <span className='font-bold'>رقم المنزل: </span>
        <span className='text-gray-700 dark:text-gray-50'>{usersData?.houseNumber}</span>
      </li>
      <li className='flex gap-x-2'>
        <span className='font-bold'>الشارع:</span>
        <span className='text-gray-700 dark:text-gray-50'>{usersData?.streetName}</span>
      </li>
      <li className='flex gap-x-2'>
        <span className='font-bold'>الحي: </span>
        <span className='text-gray-700 dark:text-gray-50'>
          {usersData?.neighborhoodName}
        </span>
      </li>
      <li className='flex gap-x-2'>
        <span className='font-bold'>المدينة: </span>
        <span className='text-gray-700 dark:text-gray-50'>{usersData?.cityName}</span>
      </li>
      <li className='flex gap-x-2'>
        <span className='font-bold'>رقم الهاتف: </span>
        <span className='text-gray-700 dark:text-gray-50' dir='auto'>
          {usersData?.phone}
        </span>
      </li>
    </ul>
  </>
)
export default DeliveryAddress

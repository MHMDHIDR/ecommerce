import { Link } from 'react-router-dom'
import goTo from '@/utils/goTo'
import { ActionBtnsProps } from '@/types'

export const AcceptBtn = ({
  id,
  phone,
  itemName,
  supplierId,
  productId,
  type,
  label
}: ActionBtnsProps) => (
  <button
    id='acceptBtn'
    data-id={id}
    data-name={itemName}
    data-supplierid={supplierId}
    data-productid={productId}
    data-type={type}
    data-phone={phone}
    data-status='accept'
    className='m-1 py-2 text-xs text-white bg-green-600 rounded-md hover:bg-green-700 min-w-[7rem] relative text-center overflow-hidden'
    data-tooltip='موافقة'
  >
    <span className='py-0.5 px-1 md:pl-1 bg-green-300 rounded-md absolute right-2 top-1.5 pointer-events-none'>
      &#9989;
    </span>
    <span className='mr-4 pointer-events-none'>{label ?? 'تفعيل'}</span>
  </button>
)

export const RejectBtn = ({
  id,
  phone,
  itemName,
  supplierId,
  productId,
  type,
  label
}: ActionBtnsProps) => (
  <button
    id='rejectBtn'
    data-id={id}
    data-name={itemName}
    data-supplierid={supplierId}
    data-productid={productId}
    data-type={type}
    data-phone={phone}
    data-status='reject'
    className='m-1 py-2 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700 min-w-[7rem] relative text-center overflow-hidden border'
    data-tooltip='رفض'
  >
    <span className='py-0.5 px-1 md:pl-1 bg-gray-300 rounded-md absolute right-2 top-1.5 pointer-events-none'>
      &#10060;
    </span>
    <span className='mr-4 pointer-events-none'>{label ?? 'رفض'}</span>
  </button>
)

export const ShippedBtn = ({
  id,
  phone,
  itemName,
  supplierId,
  productId,
  type,
  label
}: ActionBtnsProps) => (
  <button
    id='shippedBtn'
    data-id={id}
    data-name={itemName}
    data-supplierid={supplierId}
    data-productid={productId}
    data-type={type}
    data-phone={phone}
    data-status='shipped'
    className='m-1 py-2 text-xs text-white bg-blue-400 rounded-md hover:bg-blue-500 min-w-[7rem] relative text-center overflow-hidden border'
    data-tooltip='تم الشحن'
  >
    <span className='py-0.5 px-1 md:pl-1 bg-blue-300 rounded-md absolute right-2 top-1.5 pointer-events-none'>
      &#128667;
    </span>
    <span className='mr-4 pointer-events-none'>{label ?? 'تم الشحن'}</span>
  </button>
)

export const DeliveredBtn = ({
  id,
  phone,
  itemName,
  supplierId,
  productId,
  type,
  label
}: ActionBtnsProps) => (
  <button
    id='deliveredBtn'
    data-id={id}
    data-name={itemName}
    data-supplierid={supplierId}
    data-productid={productId}
    data-type={type}
    data-phone={phone}
    data-status='delivered'
    className='m-1 py-2 text-xs text-white bg-pink-600 rounded-md hover:bg-pink-700 min-w-[7rem] relative text-center overflow-hidden border'
    data-tooltip='تم التوصيل'
  >
    <span className='py-0.5 px-1 md:pl-1 bg-gray-300 rounded-md absolute right-2 top-1.5 pointer-events-none'>
      &#128230;
    </span>
    <span className='mr-4 pointer-events-none'>{label ?? 'تم التوصيل'}</span>
  </button>
)

export const EditBtn = ({ id }: any) => (
  <Link
    id='editBtn'
    to={goTo(`product/${id}`)}
    className='m-1 py-2 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700 min-w-[7rem] relative text-center overflow-hidden border'
    data-tooltip='تعديل الطلب'
  >
    <span className='py-0.5 px-1 md:pl-1 bg-gray-300 rounded-md absolute right-2 top-1.5 pointer-events-none'>
      &#9997;
    </span>
    <span className='mr-4 pointer-events-none'>تعديل</span>
  </Link>
)

export const DeleteBtn = ({
  id,
  itemName,
  imgUrl,
  type
}: {
  id: string
  itemName: string
  imgUrl?: string
  type?: string
}) => (
  <button
    id='deleteBtn'
    type='button'
    data-id={id}
    data-name={itemName}
    data-type={type}
    data-img-url={imgUrl}
    data-status='delete'
    className='m-1 py-2 text-xs text-white bg-red-600 rounded-md hover:bg-red-700 min-w-[7rem] relative text-center overflow-hidden'
    data-tooltip='حذف'
  >
    <span className='py-0.5 px-1 md:pl-1 bg-red-200 rounded-md absolute right-2 top-1.5 pointer-events-none'>
      &#128465;
    </span>
    <span className='mr-4 pointer-events-none'>حذف</span>
  </button>
)

export const InvoiceBtn = ({ id, phone, onClick }: any) => (
  <button
    id='invoiceBtn'
    data-id={id}
    data-status='invoice'
    data-phone={phone}
    className='m-1 px-1.5 py-2 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700 min-w-[5rem] text-center overflow-hidden'
    data-tooltip='إنشاء فاتورة للطلب'
    onClick={onClick}
  >
    <span className='py-0.5 px-1 bg-blue-200 rounded-md top-1.5 pointer-events-none'>
      &#128424;
    </span>
    <span className='mr-2 pointer-events-none'>إنشاء فاتورة</span>
  </button>
)

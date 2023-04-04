const OldOrderBySupplier = () => {
  return (
    <tr className='hover:bg-gray-50 dark:hover:bg-gray-700' key={idx}>
      <td>
        <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
          <span>{idx}</span>
        </Link>
      </td>
      <td className='min-w-[15rem]'>
        <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
          <menu className='list-decimal'>
            {ORDER.orderItems.map((item: any, idx: number) => (
              <li key={idx}>{item.cHeading}</li>
            ))}
          </menu>
        </Link>
      </td>
      <td>
        <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
          <span
            className={`inline-flex items-center gap-1 min-w-max rounded-full bg-green-50 px-2 py-1 text-xs ${
              ORDER.orderStatus === 'accept'
                ? 'text-green-600'
                : ORDER.orderStatus === 'reject'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                ORDER.orderStatus === 'accept'
                  ? 'bg-green-600'
                  : ORDER.orderStatus === 'reject'
                  ? 'bg-red-600'
                  : 'bg-gray-600'
              }`}
            ></span>
            {ORDER.orderStatus === 'accept'
              ? 'الطلب مقبول'
              : ORDER.orderStatus === 'reject'
              ? 'الطلب مرفوض'
              : 'بإنتظار الاجراء'}
          </span>
        </Link>
      </td>
      <td className='min-w-[13rem]'>
        <Link to={`order/${ORDER._id}`} className='inline-block py-4 px-6'>
          <span>{createLocaleDateString(ORDER.orderDate)}</span>
        </Link>
      </td>
      <td>
        <NavMenu>
          {ORDER.orderStatus === 'pending' ? (
            <>
              <AcceptBtn id={'order._id'} phone={'order.userEmail'} label='موافقة' />
              <RejectBtn id={'order._id'} phone={'order.userEmail'} />
            </>
          ) : ORDER.orderStatus === 'accept' ? (
            <RejectBtn id={'order._id'} phone={'order.userEmail'} />
          ) : ORDER.orderStatus === 'reject' ? (
            <AcceptBtn id={'order._id'} phone={'order.userEmail'} label='موافقة' />
          ) : (
            <span>لا يوجد إجراء</span>
          )}
        </NavMenu>
      </td>
    </tr>
  )
}
export default OldOrderBySupplier

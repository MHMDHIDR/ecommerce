import useDocumentTitle from '../../hooks/useDocumentTitle'

const DashboardMenu = () => {
  useDocumentTitle('عرض المنتجات')

  return (
    <section className='py-12 my-8'>
      <div className='container mx-auto max-w-6xl'>
        <h3 className='mx-0 mt-4 mb-12 text-2xl text-center md:text-3xl'>عرض المنتجات</h3>
      </div>
    </section>
  )
}

export default DashboardMenu

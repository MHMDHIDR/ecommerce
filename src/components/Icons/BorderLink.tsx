import Arrow from './Arrow'

const BorderLink = ({
  icon,
  children
}: {
  icon?: JSX.Element
  children: JSX.Element
}) => {
  return (
    <div className='flex justify-between items-center'>
      {children}
      {icon ?? <Arrow className='dark:fill-white' />}
    </div>
  )
}
export default BorderLink

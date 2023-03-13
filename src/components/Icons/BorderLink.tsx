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
      {icon ?? <Arrow />}
    </div>
  )
}
export default BorderLink

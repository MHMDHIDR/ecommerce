import { Link } from 'react-router-dom'
import Arrow from './Arrow'

const BorderLink = ({ to, children }: { to: string; children: JSX.Element }) => {
  return (
    <Link to={to} className='flex justify-between items-center'>
      {children}
      <Arrow />
    </Link>
  )
}
export default BorderLink

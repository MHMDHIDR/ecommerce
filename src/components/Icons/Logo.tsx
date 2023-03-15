import { LogoProps } from '../../types'

const Logo = ({ width = '10', height = '10', className = '' }: LogoProps) => (
  <img
    src='/assets/img/logo.png'
    className={`w-${width} h-${height} ${className}`}
    alt={`eCommerce`}
  />
)

export default Logo

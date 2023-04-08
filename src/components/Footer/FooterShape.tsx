import { LogoProps } from '@/types'

const FooterShape = ({ fill = 'darkblue', className }: LogoProps) => (
  <svg
    preserveAspectRatio='none'
    viewBox='0 0 1440 54'
    className='absolute top-0 h-6 -mt-5 sm:-mt-10 sm:h-16 w-screen'
  >
    <path
      fill={fill}
      className={className}
      d='M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z'
    />
  </svg>
)
export default FooterShape

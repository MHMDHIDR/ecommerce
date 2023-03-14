import { Link } from 'react-router-dom'

const BackButton = ({
  to = '/',
  strokeWidth = 2,
  className
}: {
  to: string
  strokeWidth?: number
  className?: string
}) => (
  <Link to={to}>
    <svg
      width='51'
      height='78'
      viewBox='0 0 51 78'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M2 38.5L39 2L49 12.5L23 39.5L49 66L39 76.5L2 38.5Z'
        stroke={
          document.querySelector('html')?.classList.contains('dark') ? 'white' : 'black'
        }
        strokeWidth={strokeWidth}
      />
    </svg>
  </Link>
)

export default BackButton

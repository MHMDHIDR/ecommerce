import Nav from './Nav'
import Menu from './Menu'
import Footer from './Footer'
import { isSmallScreen } from '@/constants'

const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <Nav />
    {children}
    <Menu />
    {!isSmallScreen ? <Footer /> : null}
  </>
)
export default Layout

import Nav from './Nav'
import Menu from './Menu'
const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <Nav />
    {children}
    <Menu />
  </>
)
export default Layout

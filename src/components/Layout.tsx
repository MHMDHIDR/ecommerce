import Nav from './Nav'
import Footer from './Footer'
const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <Nav />
    {children}
    <Footer />
  </>
)
export default Layout

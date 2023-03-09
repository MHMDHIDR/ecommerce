import { Suspense } from 'react'
//components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModalNotFound from './components/Modal/ModalNotFound'
import { LoadingPage } from './components/Loading'

//pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Product from './pages/Product'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import Notifications from './pages/Notifications'
import Account from './pages/Account'

const App = () => (
  <Router>
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/account' element={<Account />} />
        <Route path='/product/:name' element={<Product />} />
        <Route path='/categories' element={<Categories />}>
          <Route path=':name' element={<Categories />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<ModalNotFound fullscreen={true} />} />
      </Routes>
    </Suspense>
  </Router>
)

export default App

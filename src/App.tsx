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
import Cart from './pages/Cart/MyOrders'
import CompletedOrders from './pages/Cart/CompletedOrders'
import OrderAddress from './pages/OrderAddress'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
//contexts
import { CartProvider } from './contexts/CartContext'
import FileUploadContextProvider from './contexts/FileUploadContext'
import ThemeContextProvider from './contexts/ThemeContext'
import EditProfile from './pages/EditProfile'
import Favourites from './pages/Favourites'

const App = () => (
  <FileUploadContextProvider>
    <CartProvider>
      <ThemeContextProvider>
        <Router>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/completed-orders' element={<CompletedOrders />} />
              <Route path='/order-address' element={<OrderAddress />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<EditProfile />} />
              <Route path='/profile/favourites' element={<Favourites />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/categories' element={<Categories />}>
                <Route path=':name' element={<Categories />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<ModalNotFound fullscreen={true} />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeContextProvider>
    </CartProvider>
  </FileUploadContextProvider>
)

export default App

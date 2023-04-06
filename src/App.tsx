import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModalNotFound from '@/components/Modal/ModalNotFound'
import { LoadingPage } from '@/components/Loading'
//contexts
import { CartProvider } from '@/contexts/CartContext'
import FileUploadContextProvider from '@/contexts/FileUploadContext'
import ThemeContextProvider from '@/contexts/ThemeContext'
import SearchContextProvider from '@/contexts/SearchContext'
import AppSettingsContextProvider from '@/contexts/AppSettingsContext'

//pages
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import CompletedOrders from './pages/Cart/CompletedOrders'
import OrderAddress from './pages/OrderAddress'
import Notifications from './pages/Notifications'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import DashboardAddProduct from './pages/dashboard/Products/Add'
import SupplierEditProduct from './pages/dashboard/Products/Edit'
import DashboardViewProduct from './pages/dashboard/Products/View'
import SupplierDashboard from './pages/dashboard/Orders'
import DashboardOrderDetails from './pages/dashboard/Orders/Details'
import DashboardViewUsers from './pages/dashboard/Users/View'
import Profile from './pages/Profile'
import EditProfile from './pages/Profile/EditProfile'
import Favourites from './pages/Profile/Favourites'
import ShippingAddress from './pages/Profile/ShippingAddress'
//Auth routes
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import SupplierLogin from './pages/auth/Supplier/SupplierLogin'
import SupplierSignup from './pages/auth/Supplier/SupplierSignup'
import AdminLogin from './pages/auth/Admin/AdminLogin'
import AdminSignup from './pages/auth/Admin/AdminSignup'

const App = () => {
  return (
    <ThemeContextProvider>
      <AppSettingsContextProvider>
        <SearchContextProvider>
          <FileUploadContextProvider>
            <CartProvider>
              <Router>
                <Suspense fallback={<LoadingPage />}>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/completed-orders' element={<CompletedOrders />} />
                    <Route path='/order-address' element={<OrderAddress />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='/categories' element={<Categories />}>
                      <Route path=':name' element={<Categories />} />
                    </Route>
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='/terms-and-conditions' element={<TermsConditions />} />

                    {/* Profile Routes */}
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/edit' element={<EditProfile />} />
                    <Route path='/profile/favourites' element={<Favourites />} />
                    <Route
                      path='/profile/shipping-address'
                      element={<ShippingAddress />}
                    />

                    {/* Auth Routes */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/supplier-login' element={<SupplierLogin />} />
                    <Route path='/supplier-signup' element={<SupplierSignup />} />
                    <Route path='/admin-login' element={<AdminLogin />} />
                    <Route path='/admin-signup' element={<AdminSignup />} />

                    {/* Supplier Dashboard Routes */}
                    <Route path='supplier' element={<SupplierDashboard />} />
                    <Route path='supplier/add' element={<DashboardAddProduct />} />
                    <Route path='supplier/products' element={<DashboardViewProduct />} />
                    <Route
                      path='supplier/order/:id/:userId'
                      element={<DashboardOrderDetails />}
                    />
                    <Route
                      path='supplier/product/:id'
                      element={<SupplierEditProduct />}
                    />
                    {/* Admin Dashboard Routes */}
                    <Route path='dashboard' element={<SupplierDashboard />} />
                    <Route path='dashboard/add' element={<DashboardAddProduct />} />
                    <Route path='dashboard/products' element={<DashboardViewProduct />} />
                    <Route
                      path='dashboard/order/:id/:userId'
                      element={<DashboardOrderDetails />}
                    />
                    <Route
                      path='dashboard/product/:id'
                      element={<SupplierEditProduct />}
                    />
                    <Route path='dashboard/users' element={<DashboardViewUsers />} />

                    <Route path='*' element={<ModalNotFound fullscreen={true} />} />
                  </Routes>
                </Suspense>
              </Router>
              <ToastContainer rtl />
            </CartProvider>
          </FileUploadContextProvider>
        </SearchContextProvider>
      </AppSettingsContextProvider>
    </ThemeContextProvider>
  )
}

export default App

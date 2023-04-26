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
import AddProduct from './pages/dashboard/Products/Add'
import EditProduct from './pages/dashboard/Products/Edit'
import ViewProduct from './pages/dashboard/Products/View'
import SupplierDashboard from './pages/dashboard/Orders'
import DashboardViewUsers from './pages/dashboard/Users/View'
import Profile from './pages/Profile'
import EditProfile from './pages/Profile/EditProfile'
import Favourites from './pages/Profile/Favourites'
import ShippingAddress from './pages/Profile/ShippingAddress'
import Search from './pages/Search'
//Auth routes
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import SupplierLogin from './pages/auth/Supplier/SupplierLogin'
import SupplierSignup from './pages/auth/Supplier/SupplierSignup'
import AdminLogin from './pages/auth/Admin/AdminLogin'
import AdminSignup from './pages/auth/Admin/AdminSignup'
import AddCategory from './pages/dashboard/Categories/Add'
import ViewCategory from './pages/dashboard/Categories/View'
import EditCategory from './pages/dashboard/Categories/Edit'
import DashboardOrderDetails from './pages/dashboard/Orders/Details'

const App = () => {
  return (
    <ThemeContextProvider>
      <AppSettingsContextProvider>
        <FileUploadContextProvider>
          <CartProvider>
            <Router>
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/search/:query' element={<Search />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/completed-orders' element={<CompletedOrders />} />
                  <Route path='/order-address' element={<OrderAddress />} />
                  <Route path='/notifications' element={<Notifications />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/product/:id' element={<Product />} />
                  <Route path='/categories/:name' element={<Categories />}></Route>
                  <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                  <Route path='/terms-and-conditions' element={<TermsConditions />} />
                  {/* Profile Routes */}
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/profile/edit' element={<EditProfile />} />
                  <Route path='/profile/favourites' element={<Favourites />} />
                  <Route path='/profile/shipping-address' element={<ShippingAddress />} />
                  {/* Auth Routes */}
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/supplier-login' element={<SupplierLogin />} />
                  <Route path='/supplier-signup' element={<SupplierSignup />} />
                  <Route path='/admin-login' element={<AdminLogin />} />
                  <Route path='/admin-signup' element={<AdminSignup />} />
                  {/* Supplier Dashboard Routes */}
                  {/* Supplier Orders */}
                  <Route path='supplier' element={<SupplierDashboard />} />
                  {/* Supplier Products */}
                  <Route path='supplier/add' element={<AddProduct />} />
                  <Route path='supplier/products' element={<ViewProduct />} />
                  <Route path='supplier/product/:id' element={<EditProduct />} />
                  {/* Supplier Categories */}
                  <Route path='supplier/category/add' element={<AddCategory />} />
                  <Route path='supplier/categories' element={<ViewCategory />} />
                  <Route path='supplier/category/:id' element={<EditCategory />} />
                  {/* Admin Dashboard Routes */}
                  {/* Admin Orders */}
                  <Route path='dashboard' element={<SupplierDashboard />} />
                  <Route
                    path='dashboard/order/:id/:userId'
                    element={<DashboardOrderDetails />}
                  />
                  {/* Admin Products */}
                  <Route path='dashboard/add' element={<AddProduct />} />
                  <Route path='dashboard/products' element={<ViewProduct />} />
                  <Route path='dashboard/product/:id' element={<EditProduct />} />
                  {/* Admin Categories */}
                  <Route path='dashboard/category/add' element={<AddCategory />} />
                  <Route path='dashboard/categories' element={<ViewCategory />} />
                  <Route path='dashboard/category/:id' element={<EditCategory />} />
                  {/* Admin Users */}
                  <Route path='dashboard/users' element={<DashboardViewUsers />} />
                  <Route path='*' element={<ModalNotFound fullscreen={true} />} />
                </Routes>
              </Suspense>
            </Router>
            <ToastContainer rtl />
          </CartProvider>
        </FileUploadContextProvider>
      </AppSettingsContextProvider>
    </ThemeContextProvider>
  )
}

export default App

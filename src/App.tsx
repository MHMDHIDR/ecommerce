import { Suspense, lazy } from 'react'
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
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const Product = lazy(() => import('./pages/Product'))
const Categories = lazy(() => import('./pages/Categories'))
const Cart = lazy(() => import('./pages/Cart'))
const CompletedOrders = lazy(() => import('./pages/Cart/CompletedOrders'))
const OrderAddress = lazy(() => import('./pages/OrderAddress'))
const Notifications = lazy(() => import('./pages/Notifications'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const AddProduct = lazy(() => import('./pages/dashboard/Products/Add'))
const EditProduct = lazy(() => import('./pages/dashboard/Products/Edit'))
const ViewProduct = lazy(() => import('./pages/dashboard/Products/View'))
const SupplierDashboard = lazy(() => import('./pages/dashboard/Orders'))
const DashboardViewUsers = lazy(() => import('./pages/dashboard/Users/View'))
const Profile = lazy(() => import('./pages/Profile'))
const EditProfile = lazy(() => import('./pages/Profile/EditProfile'))
const Favourites = lazy(() => import('./pages/Profile/Favourites'))
const ShippingAddress = lazy(() => import('./pages/Profile/ShippingAddress'))
const Search = lazy(() => import('./pages/Search'))
//Auth routes
const Signup = lazy(() => import('./pages/auth/Signup'))
const Login = lazy(() => import('./pages/auth/Login'))
const SupplierLogin = lazy(() => import('./pages/auth/Supplier/SupplierLogin'))
const SupplierSignup = lazy(() => import('./pages/auth/Supplier/SupplierSignup'))
const AdminLogin = lazy(() => import('./pages/auth/Admin/AdminLogin'))
const AdminSignup = lazy(() => import('./pages/auth/Admin/AdminSignup'))
const AddCategory = lazy(() => import('./pages/dashboard/Categories/Add'))
const ViewCategory = lazy(() => import('./pages/dashboard/Categories/View'))
const EditCategory = lazy(() => import('./pages/dashboard/Categories/Edit'))
const DashboardOrderDetails = lazy(() => import('./pages/dashboard/Orders/Details'))

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

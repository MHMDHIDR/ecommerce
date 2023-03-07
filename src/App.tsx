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

const App = () => (
  <Router>
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path='/product' element={<Product />}>
          <Route path=':name' element={<Product />} />
        </Route>
        <Route path='/categories' element={<Categories />}>
          <Route path=':name' element={<Product />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<ModalNotFound fullscreen={true} />} />
      </Routes>
    </Suspense>
  </Router>
)

export default App

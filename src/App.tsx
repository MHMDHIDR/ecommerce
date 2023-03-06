import { Suspense } from 'react'
//components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModalNotFound from './components/Modal/ModalNotFound'
import { LoadingPage } from './components/Loading'
import Categories from './components/Categories'
//pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

const App = () => (
  <Router>
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path='/' element={<Categories />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<ModalNotFound fullscreen={true} />} />
      </Routes>
    </Suspense>
  </Router>
)

export default App

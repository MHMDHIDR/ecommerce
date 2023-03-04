import { Suspense, lazy, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

//Loading Page
import { LoadingPage } from '../components/Loading'

import useDocumentTitle from '../hooks/useDocumentTitle'

//components
// const Header from '../components/Header'
// const Footer from '../components/Footer'

const Home = () => {
  useDocumentTitle('Home')
  const notify = () => toast('مرحبا بك!')

  return (
    <Suspense fallback={<LoadingPage />}>
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer className={'mt-20'} />
      </div>
      {/* <Header />
      <Footer /> */}
    </Suspense>
  )
}

export default Home

import { Suspense } from 'react'

//Loading Page
import { LoadingPage } from '../components/Loading'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Home')

  return <Suspense fallback={<LoadingPage />}></Suspense>
}

export default Home

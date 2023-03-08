import { Suspense } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { LoadingPage } from '../components/Loading'
import Layout from '../components/Layout'

const Home = () => {
  useDocumentTitle('Home')

  return (
    <Suspense fallback={<LoadingPage />}>
      <Layout>
        <section className='h-screen'>
          <h1>Home Page</h1>
        </section>
      </Layout>
    </Suspense>
  )
}

export default Home

import { useEffect } from 'react'
// import getData from './getData'

const useDocumentTitle = (title: string) => {
  // const { response } = getData({ url: '/settings' })
  const appName = /*response?.appName ||*/ 'eCommerce'

  useEffect(() => {
    document.title = window.location.pathname.includes('dashboard')
      ? title + ` | Dashboard | ${appName}`
      : title + ` | ${appName}`
  })
}

export default useDocumentTitle

import { useLocation } from 'react-router-dom'
// funciton that returns the subpath and give a go to path
const goTo = (subpath: string) => {
  const { pathname } = typeof window !== 'undefined' ? window.location : useLocation()
  const subpathRoot = pathname.split('/')[1] // subpath root (/dashboard)
  return subpath === subpathRoot ? `/${subpathRoot}` : `/${subpathRoot}/` + subpath
}

export default goTo

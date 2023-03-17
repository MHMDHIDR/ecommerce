import { useContext } from 'react'
import { AppSettingsContext } from '../contexts/AppSettingsContext'
import useEventListener from '../hooks/useEventListener'
import { AppSettingsProps } from '../types'

const Overlay = () => {
  const { isSidebarOpen, menuToggler } = useContext<AppSettingsProps>(AppSettingsContext)

  useEventListener('keydown', (e: any) => e.key === 'Escape' && menuToggler())

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 bg-black ${
        isSidebarOpen
          ? 'opacity-100 bg-opacity-75 pointer-events-auto'
          : 'opacity-0 bg-opacity-0 pointer-events-none'
      }`}
      onClick={menuToggler}
    />
  )
}
export default Overlay

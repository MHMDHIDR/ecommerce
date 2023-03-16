import { useState, createContext, ReactNode } from 'react'
import { AppSettingsProps } from '../types'

export const AppSettingsContext = createContext<AppSettingsProps>({} as AppSettingsProps)

const AppSettingsContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function setSidebarOpen(isSidebarOpen: boolean) {
    const navigationToggler = document.querySelector('#navigationToggler')
    if (isSidebarOpen) {
      navigationToggler!.setAttribute('aria-expanded', 'true')
      return
    }
    navigationToggler!.setAttribute('aria-expanded', 'false') //set to original state
  }

  const menuToggler = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <AppSettingsContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        setSidebarOpen,
        menuToggler
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}

export default AppSettingsContextProvider

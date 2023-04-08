import { useState, createContext, ReactNode } from 'react'
import { AppSettingsProps, UserType } from '@/types'
import { USER_DATA } from '@/constants'
import { stringJson } from '@/utils/jsonTools'

export const AppSettingsContext = createContext<AppSettingsProps>({} as AppSettingsProps)

const AppSettingsContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserType>(USER_DATA)

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
    document.querySelector('body')?.classList.toggle('overflow-hidden')
  }

  function setLocalStorageUser(user: UserType) {
    return localStorage.setItem('user', stringJson(user!))
  }

  function getLocalStorageUser() {
    return localStorage.getItem('user')!
  }

  return (
    <AppSettingsContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        setSidebarOpen,
        menuToggler,
        user,
        setUser,
        setLocalStorageUser,
        getLocalStorageUser
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  )
}

export default AppSettingsContextProvider

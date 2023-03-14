import React, { useState, createContext } from 'react'
import { ThemeProps } from '../types'

export const ThemeContext = createContext<ThemeProps>({} as ThemeProps)

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(getLocalStorageTheme() ? true : false)

  setHtmlToDark(getLocalStorageTheme())

  //get the theme from localStorage
  function getLocalStorageTheme() {
    return localStorage.getItem('theme') === 'dark' ? true : false
  }

  function setLocalStorageTheme(isDark: boolean) {
    return localStorage.setItem('theme', isDark ? 'dark' : 'lights')
  }

  function setHtmlToDark(isDark: boolean) {
    const HTML = document.querySelector('html')
    if (isDark || getLocalStorageTheme()) {
      HTML!.classList.add('dark')
      return
    }
    HTML!.classList.remove('dark') //remove dark class
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        getLocalStorageTheme,
        setLocalStorageTheme,
        setHtmlToDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider

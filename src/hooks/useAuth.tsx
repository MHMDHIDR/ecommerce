import { useState, useEffect, useContext } from 'react'
import { getCookies } from '@/utils/cookies'
import { useAxios } from './useAxios'
import { parseJson, stringJson } from '@/utils/jsonTools'
import { UserType } from '@/types'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { isValidJwt } from '@/utils/jwt'

/**
 * Custom hook to check whether the user is authenticated or NOT
 */

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserType>(null)
  const [dataFrom, setDataFrom] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const { setLocalStorageUser, getLocalStorageUser } = useContext(AppSettingsContext)

  const token = getCookies()

  const { response, loading: axiosLoading } = useAxios({
    url: `/users`,
    headers: stringJson({ Authorization: `Bearer ${token}` })
  })

  useEffect(() => {
    //if no user in LocalStorage
    if (getLocalStorageUser() === null) {
      if (!token || !isValidJwt(token!)) {
        setIsAuth(false)
        setUserData(null)
        setLoading(false)
        return
      }

      if (response && !axiosLoading) {
        setIsAuth(true)
        setUserData(response)
        setLocalStorageUser(response)
        setLoading(false)
        setDataFrom('useAuth')
      } else {
        setLoading(true)
      }
    } else {
      //else if user is in LocalStorage
      const localStorageUser = getLocalStorageUser()
      if (localStorageUser) {
        setIsAuth(true)
        setUserData(parseJson(localStorageUser))
        setDataFrom('LocalStorage')
        setLoading(false)
      } else {
        setLoading(true)
      }
    }
  }, [token, response, axiosLoading, getLocalStorageUser, setLocalStorageUser])

  return { isAuth, userData, dataFrom, loading }
}

export default useAuth

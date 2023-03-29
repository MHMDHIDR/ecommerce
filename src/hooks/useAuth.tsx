import { useState, useEffect } from 'react'
import { getCookies } from '@/utils/cookies'
import { useAxios } from './useAxios'
import { stringJson } from '@/utils/jsonTools'
import { UserType } from '@/types'

/**
 * Custom hook to check whether the user is authenticated or NOT
 */

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserType>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const token = getCookies()

  const { response, loading: axiosLoading } = useAxios({
    url: `/users`,
    headers: stringJson({ Authorization: `Bearer ${token}` })
  })

  useEffect(() => {
    if (!token) {
      setIsAuth(false)
      setUserData(null)
      setLoading(false)
      return
    }

    if (response && !axiosLoading) {
      setIsAuth(true)
      setUserData(response)
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [token, response, axiosLoading])

  return { isAuth, userData, loading }
}

export default useAuth

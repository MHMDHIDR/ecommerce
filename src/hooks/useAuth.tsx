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

  useEffect(() => {
    const token = getCookies()
    if (!token) {
      setIsAuth(false)
      setUserData(null)
      setLoading(false)
      return
    }

    const { response, loading } = useAxios({
      url: `/users`,
      headers: stringJson({ Authorization: `Bearer ${token}` })
    })

    if (response && !loading) {
      setIsAuth(true)
      setUserData(response)
      setLoading(false)
    }

    return (): void => {
      setIsAuth(false)
      setUserData(null)
      setLoading(false)
    }
  }, [])

  return { isAuth, userData, loading }
}

export default useAuth

import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AppSettingsContext } from '@/contexts/AppSettingsContext'
import { UserType } from '@/types'
import { parseJson } from '@/utils/jsonTools'
import { getCookies } from '@/utils/cookies'
import { isValidJwt, parseJwt } from '@/utils/jwt'
import { API_URL } from '@/constants'

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserType | null>(null)
  const [userType, setUserType] = useState<UserType['type']>('user')
  const [dataFrom, setDataFrom] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const { setLocalStorageUser, getLocalStorageUser } = useContext(AppSettingsContext)

  const token = getCookies()

  useEffect(() => {
    const fetchData = async () => {
      if (token && isValidJwt(token)) {
        const { userId, userType } = parseJwt(token)
        setLoading(true)
        setUserType(userType)

        // check if user is already in local storage
        const localUser = getLocalStorageUser()
        if (localUser) {
          setIsAuth(true)
          setUserData(parseJson(localUser)[0])
          setDataFrom('LocalStorage')
          setLoading(false)
        } else {
          const { data } = await axios.get(
            `${API_URL}/users${userId ? '/' + userId : ''}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )

          setIsAuth(true)
          setUserData(data)
          setLocalStorageUser(data)
          setDataFrom('API')
          setLoading(false)
        }
      } else {
        setIsAuth(false)
        setUserData(null)
        setDataFrom('')
        setLoading(false)
      }
    }

    fetchData()
  }, [token, setLocalStorageUser, getLocalStorageUser, loading])

  return { isAuth, userType, userData, dataFrom, loading }
}

export default useAuth

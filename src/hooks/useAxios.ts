import { useEffect, useState } from 'react'
import Axios from 'axios'
import { axiosProps } from '@/types'
import { API_URL } from '@/constants'
import { parseJson } from '@/utils/functions/jsonTools'

Axios.defaults.baseURL = API_URL

const fetchData = async ({
  url,
  method = 'get',
  body = null,
  headers = null
}: axiosProps) => {
  try {
    const result = await Axios({
      url,
      method,
      data: body,
      headers:
        headers !== null
          ? parseJson(headers)
          : {
              'Content-Type': 'application/json'
            }
    })
    return result.data
  } catch (error) {
    throw error
  }
}

const useAxios = ({ url, method = 'get', body = null, headers = null }: axiosProps) => {
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<{
    error: any
    response: any
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await fetchData({ url, method, body, headers })
        setResponse(responseData?.response ? responseData.response : responseData)
        setLoading(false)
      } catch (error) {
        setError({ error, response: error })
        setLoading(false)
      }
    }
    fetchDataAsync()
  }, [url, method, body, headers])

  return { response, error, loading }
}

export { useAxios, fetchData }

import { useState, useCallback } from 'react'

import { client } from '../api/client'

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type UseApiResult<T> = {
  data: T | null
  loading: boolean
  error: string | null
  execute: (...args: any[]) => Promise<void>
}

function useApi<T>(method: ApiMethod, path: string, options?: { immediate?: boolean }): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (params?: any) => {
      setLoading(true)
      setError(null)

      try {
        let response

        switch (method) {
          case 'GET':
            // @ts-expect-error - path is validated at runtime
            response = await client.GET(path, params)
            break
          case 'POST':
            // @ts-expect-error - path is validated at runtime
            response = await client.POST(path, params)
            break
          case 'PUT':
            // @ts-expect-error - path is validated at runtime
            response = await client.PUT(path, params)
            break
          case 'DELETE':
            // @ts-expect-error - path is validated at runtime
            response = await client.DELETE(path, params)
            break
          default:
            throw new Error(`Unsupported method: ${method}`)
        }

        if (response.error) {
          throw new Error('API request failed')
        }

        setData(response.data as T)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка')
      } finally {
        setLoading(false)
      }
    },
    [method, path],
  )

  return { data, loading, error, execute }
}

export default useApi

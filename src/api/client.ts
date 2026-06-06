import createClient from 'openapi-fetch'

import type { paths } from './schema'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const client = createClient<paths>({
  baseUrl: BASE_URL,
})

client.use({
  async onRequest({ request }) {
    const token = localStorage.getItem('access_token')
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
})

client.use({
  async onResponse({ response }) {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('access_token')
        window.location.href = '/login'
      }

      let errorMessage = 'Ошибка'
      try {
        const errorData = await response.json()
        if (errorData && typeof errorData === 'object') {
          if ('error' in errorData && errorData.error && 'message' in errorData.error) {
            errorMessage = errorData.error.message
          } else if ('message' in errorData) {
            errorMessage = errorData.message
          }
        }
      } catch {
        errorMessage = response.statusText || 'Ошибка'
      }

      throw new Error(errorMessage)
    }
    return response
  },
})

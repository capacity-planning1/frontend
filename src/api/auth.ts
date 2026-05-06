import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export interface TokenResponse {
  access_token: string
  token_type?: string
  expires_in?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

const authClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

export async function login({ email, password }: LoginCredentials): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'password',
    username: email,
    password,
    scope: 'students:read projects:read',
  })

  const { data } = await authClient.post<TokenResponse>('/auth/token', body)
  return data
}

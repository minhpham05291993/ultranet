import axiosInstance from 'src/services'
import { LoginParams, UserDataType } from 'src/context/types'
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const AuthUrl = {
  login: `${baseUrl}/auth/signin`,
  me: `${baseUrl}/user`,
  refreshToken: `${baseUrl}/auth/refresh_token`
}

interface LoginResponse {
  tokenType: string
  accessToken: string
  refreshToken: string
}

const AuthService = {
  // Plain request, no token
  login: (data: LoginParams) => {
    return axios({
      method: 'POST',
      url: AuthUrl.login,
      data
    }) as Promise<{
      data: LoginResponse
    }>
  },
  getRefreshToken: (data: { refreshToken: string }) => {
    return axios({
      method: 'POST',
      url: AuthUrl.refreshToken,
      data
    })
  },
  me: () => {
    return axiosInstance({
      method: 'GET',
      url: AuthUrl.me
    }) as Promise<{
      user: UserDataType
    }>
  }
}

export default AuthService

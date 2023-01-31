import axiosInstance from 'src/services'
import { UserType } from 'src/types/apps/userTypes'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const userUrl = {
  list: `${baseUrl}/user/list`,
  detail: (userId: number) => `${baseUrl}/user/${userId}`,
  update: `${baseUrl}/user/edit`,
  create: `${baseUrl}/user/add`,
  delete: (userId: number) => `${baseUrl}/user/${userId}`
}

const userService = {
  list: () => {
    return axiosInstance({
      method: 'GET',
      url: userUrl.list
    }) as Promise<{
      users: UserType[]
    }>
  },
  detail: (userId: number) => {
    return axiosInstance({
      method: 'GET',
      url: userUrl.detail(userId)
    }) as Promise<{
      user: UserType
    }>
  },
  update: (data: UserType) => {
    return axiosInstance({
      method: 'PUT',
      url: userUrl.update,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  create: (data: Omit<UserType, 'id'>) => {
    return axiosInstance({
      method: 'POST',
      url: userUrl.create,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  
  delete: (userId: number) => {
    return axiosInstance({
      method: 'DELETE',
      url: userUrl.delete(userId)
    }) as Promise<{
      Ok: boolean
    }>
  }
}

export default userService

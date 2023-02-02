import axiosInstance from 'src/services'
import { UserType } from 'src/types/apps/userTypes'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const UserUrl = {
  list: `${baseUrl}/user/list`,
  detail: (userId: number) => `${baseUrl}/user/${userId}`,
  update: `${baseUrl}/user/edit`,
  create: `${baseUrl}/user/add`,
  delete: (userId: number) => `${baseUrl}/user/${userId}`,
  checkin: `${baseUrl}/checkin`,
  checkout: `${baseUrl}/checkout`,
  exportExcel: `${baseUrl}/timekeeping/excel`
}

const UserService = {
  list: () => {
    return axiosInstance({
      method: 'GET',
      url: UserUrl.list
    }) as Promise<{
      users: UserType[]
    }>
  },
  detail: (userId: number) => {
    return axiosInstance({
      method: 'GET',
      url: UserUrl.detail(userId)
    }) as Promise<{
      user: UserType
    }>
  },
  update: (data: UserType) => {
    return axiosInstance({
      method: 'PUT',
      url: UserUrl.update,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  create: (data: Omit<UserType, 'id'>) => {
    return axiosInstance({
      method: 'POST',
      url: UserUrl.create,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },

  delete: (userId: number) => {
    return axiosInstance({
      method: 'DELETE',
      url: UserUrl.delete(userId)
    }) as Promise<{
      Ok: boolean
    }>
  },
  checkin: () => {
    return axiosInstance({
      method: 'POST',
      url: UserUrl.checkin
    }) as Promise<{
      Ok: boolean
    }>
  },
  checkout: () => {
    return axiosInstance({
      method: 'POST',
      url: UserUrl.checkout
    }) as Promise<{
      Ok: boolean
    }>
  },
  exportExcel: (params: any) => {
    return axiosInstance({
      method: 'GET',
      url: UserUrl.exportExcel,
      responseType: 'blob',
      params
    }) as Promise<{
      data: any
    }>
  }
}

export default UserService

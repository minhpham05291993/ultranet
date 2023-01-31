// ** Service Imports
import axiosInstance from 'src/services'

// ** Types Imports
import { Factory, FactoryInformation, FactoryUserManagement, FactoryForecast } from 'src/types/apps/factoryTypes'
import { Period } from 'src/types/apps/chartTypes'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const FactoryUrl = {
  list: `${baseUrl}/factory`,
  detail: (factoryId: number) => `${baseUrl}/factory/${factoryId}`,
  update: `${baseUrl}/factory`,
  create: `${baseUrl}/factory`,
  delete: (factoryId: number) => `${baseUrl}/factory/${factoryId}`,
  information: (factoryId: number) => `${baseUrl}/factory/information/${factoryId}`,
  userManagement: `${baseUrl}/factory/user/management`,
  forecast: `${baseUrl}/factory/forecast/data`
}

const FactoryService = {
  list: () => {
    return axiosInstance({
      method: 'GET',
      url: FactoryUrl.list
    }) as Promise<{
      factories: Factory[]
    }>
  },
  detail: (factoryId: number) => {
    return axiosInstance({
      method: 'GET',
      url: FactoryUrl.detail(factoryId)
    }) as Promise<{
      factory: Factory
    }>
  },
  update: (data: Factory) => {
    return axiosInstance({
      method: 'PUT',
      url: FactoryUrl.update,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  create: (data: Omit<Factory, 'id'>) => {
    return axiosInstance({
      method: 'POST',
      url: FactoryUrl.create,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  delete: (factoryId: number) => {
    return axiosInstance({
      method: 'DELETE',
      url: FactoryUrl.delete(factoryId)
    }) as Promise<{
      Ok: boolean
    }>
  },
  forecast: async ({ factoriesId, period }: { factoriesId: number[]; period: Period }) => {
    return axiosInstance({
      method: 'GET',
      url: FactoryUrl.forecast,
      params: {
        factories_id: factoriesId,
        period
      }
    }) as Promise<{
      [factoryId: string]: FactoryForecast[]
    }>
  },
  information: (factoryId: number) => {
    return axiosInstance({
      method: 'GET',
      url: FactoryUrl.information(factoryId)
    }) as Promise<FactoryInformation>
  },
  userManagement: () => {
    return axiosInstance({
      method: 'GET',
      url: FactoryUrl.userManagement
    }) as Promise<FactoryUserManagement>
  }
}

export default FactoryService

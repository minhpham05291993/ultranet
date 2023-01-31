// ** Service Imports
import axiosInstance from 'src/services'

// ** Types Imports

import { Turbine, TurbineForecast } from 'src/types/apps/turbineTypes'
import { Period } from 'src/types/apps/chartTypes'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const TurbineUrl = {
  create: `${baseUrl}/turbine`,
  list: (factoryId: number) => `${baseUrl}/turbine/factory/${factoryId}`,
  update: `${baseUrl}/turbine`,
  delete: (turbineId: number) => `${baseUrl}/turbine/${turbineId}`,
  forecast: `${baseUrl}/turbine/forecast/data`
}

const TurbineService = {
  create: (data: Omit<Turbine, 'id'>) => {
    return axiosInstance({
      method: 'POST',
      url: TurbineUrl.create,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  list: (factoryId: number) => {
    return axiosInstance({
      method: 'GET',
      url: TurbineUrl.list(factoryId)
    }) as Promise<{
      turbines: Turbine[]
    }>
  },
  update: (data: Turbine) => {
    return axiosInstance({
      method: 'PUT',
      url: TurbineUrl.update,
      data
    }) as Promise<{
      Ok: boolean
    }>
  },
  delete: (factoryId: number) => {
    return axiosInstance({
      method: 'DELETE',
      url: TurbineUrl.delete(factoryId)
    }) as Promise<{
      Ok: boolean
    }>
  },
  forecast: async ({ turbinesId, period }: { turbinesId: number[]; period: Period }) => {
    return axiosInstance({
      method: 'GET',
      url: TurbineUrl.forecast,
      params: {
        turbines_id: turbinesId,
        period
      }
    }) as Promise<{
      [turbinesId: string]: TurbineForecast[]
    }>
  }
}

export default TurbineService

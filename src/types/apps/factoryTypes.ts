import { Turbine } from './turbineTypes'

export interface Factory {
  id: number
  code: string
  name: string
  longitude: number
  latitude: number
  manager: string
  status: string
  image: string
  power: number
  number_turbine: number
  turbines: Turbine[]
}

export interface FactoryInformation {
  total_power_forecasting: number
  total_turbine: number
  number_user: number
}

export interface FactoryUserManagement {
  total_power_forecasting: number
  total_wind_farm: number
  total_turbine: number
  number_user: number
}

export interface FactoryForecast {
  capacity: number
  timestamp: string
}

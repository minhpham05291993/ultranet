export interface Turbine {
  id: number
  company: string
  model: string
  radius_blade: number
  factory_id: number
  longitude: number
  latitude: number
  efficiency: number
  power: number
}

export interface TurbineForecast {
  capacity: number
  timestamp: string
}

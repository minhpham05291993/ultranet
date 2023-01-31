import { useState, useEffect } from 'react'
import TurbineService from 'src/services/turbine'
import { Turbine } from 'src/types/apps/turbineTypes'

const useTurbine = (factoryId: number) => {
  const [turbine, setturbine] = useState<Turbine[]>([])

  useEffect(() => {
    const getturbine = async () => {
      try {
        const res = await TurbineService.list(factoryId)
        const mappedRes: Turbine[] = res.turbines
        setturbine(mappedRes)
      } catch (error) {
        console.log(error)
      }
    }
    getturbine()
  }, [factoryId])

  return { turbine }
}

export default useTurbine

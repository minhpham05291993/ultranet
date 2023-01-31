import { useState, useEffect } from 'react'
import FactoryService from 'src/services/factory'
import { Factory } from 'src/types/apps/factoryTypes'

const useFactoryDetail = (factoryId: number) => {
  const [factory, setFactory] = useState<Factory | null>(null)

  useEffect(() => {
    const getFactoryDetail = async () => {
      try {
        const res = await FactoryService.detail(factoryId)
        const mappedRes: Factory = res.factory
        setFactory(mappedRes)
      } catch (error) {
        console.log(error)
      }
    }
    getFactoryDetail()
  }, [factoryId])

  return { factory }
}

export default useFactoryDetail

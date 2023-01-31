import { useState, useEffect } from 'react'
import FactoryService from 'src/services/factory'
import { Factory } from 'src/types/apps/factoryTypes'

const useFactory = () => {
  const [factory, setFactory] = useState<Factory[]>([])

  useEffect(() => {
    const getListFactory = async () => {
      try {
        const res = await FactoryService.list()
        const mappedRes: Factory[] = res.factories
        setFactory(mappedRes)
      } catch (error) {
        console.log(error)
      }
    }
    getListFactory()
  }, [])

  const addFactory = async (data: Omit<Factory, 'id'>) => {
    try {
      await FactoryService.create(data)
      const res = await FactoryService.list()
      const mappedRes: Factory[] = res.factories
      setFactory(mappedRes)
    } catch (error) {
      console.log(error)
    }
  }

  return { factory, addFactory }
}

export default useFactory

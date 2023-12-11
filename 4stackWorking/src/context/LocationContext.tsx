// ** React Imports
import { createContext, useMemo, ReactNode, useContext, useState } from 'react'

export interface ILocation {
  asPath: string
  path: string
  title: string
}

export interface ILocationsProvider {
  locations: ILocation[]
  addLocation: (location: ILocation) => void
  changeLocation: (location: ILocation) => void
  removeAllLocations: () => void
}

// ** Defaults
const defaultProvider: ILocationsProvider = {
  locations: [],
  addLocation: () => Promise.resolve(),
  changeLocation: () => Promise.resolve(),
  removeAllLocations: () => Promise.resolve()
}

const LocationContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const LocationProvider = ({ children }: Props) => {
  const [locations, setLocations] = useState<ILocationsProvider['locations']>([])

  const addLocation = (location: ILocation) => {
    setLocations([...locations, location])
  }

  const changeLocation = (location: ILocation) => {
    const isPathAlreadyExist = locations.find(loc => loc.path === location.path)
    if (isPathAlreadyExist) {
      const locationIndex = locations.findIndex(loc => loc.path === location.path)
      const updated = locations.slice(0, locationIndex + 1)
      setLocations(updated)
    } else {
      // console.log("Add Path")
      addLocation({
        asPath: location.asPath,
        path: location.path,
        title: location.title
      })
    }
  }

  const removeAllLocations = () => {
    setLocations([])
  }

  const values = useMemo(
    () => ({
      locations,
      addLocation,
      changeLocation,
      removeAllLocations
    }),
    [locations, addLocation]
  )

  return <LocationContext.Provider value={values}> {children} </LocationContext.Provider>
}

export { LocationContext, LocationProvider }

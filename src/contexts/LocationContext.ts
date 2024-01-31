import { Dispatch, SetStateAction, createContext } from 'react'

interface ILocationContext {
	isLocationOpen: boolean
	setIsLocationOpen: Dispatch<SetStateAction<boolean>>
}

export const LocationContext = createContext<ILocationContext | undefined>(
	undefined
)

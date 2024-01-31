import { Dispatch, SetStateAction, createContext } from 'react'

interface IAuthContext {
	isAuthOpen: boolean
	setIsAuthOpen: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

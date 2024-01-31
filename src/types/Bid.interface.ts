import { IUser } from './User.interface'

export interface IBid {
	id: number
	vin: string
	key: string
	date: string
	text: string
	author: IUser
	authorId: number
}

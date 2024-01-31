import { IBid } from './Bid.interface'

export interface IUser {
	id: number
	login: string
	password: string
	key: string
	name: string
	phone: string
	location: string
	token: string
	bids: IBid[]
}

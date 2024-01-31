import axios from '@/axios'
import { IUser } from '@/types/User.interface'

export const UserService = {
	async getMe() {
		const { data } = await axios.get<IUser>('/auth/me')
		return data
	},
}

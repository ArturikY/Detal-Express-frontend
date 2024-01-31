import { IBid } from '@/types/Bid.interface'

export const IncrementKey = (bid: IBid | undefined) => {
	if (bid) {
		const current = Number(bid.key.split('-')[1]) + 1
		return current
	} else {
		return 1
	}
}

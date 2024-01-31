import { FC } from 'react'
import styles from './Bid.module.scss'
import { IBid } from '@/types/Bid.interface'
import { TransformDate } from '@/utils/TransformDate'

interface IBidLocal {
	bid: IBid
}

export const Bid: FC<IBidLocal> = ({ bid }) => {
	return (
		<div className={styles.bid}>
			<div className={styles.title}>
				<h2>{bid.vin}</h2>
				<p>
					#<b>{bid.key}</b>
				</p>
			</div>
			<div className={styles.text}>{bid.text}</div>
			<p className={styles.date}>{TransformDate(bid.date)}</p>
		</div>
	)
}

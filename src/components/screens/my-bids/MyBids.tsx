import { Layout } from '@/components/layout/Layout'
import { UserService } from '@/services/User.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import styles from './MyBids.module.scss'
import { Bid } from './bid/Bid'

export const MyBids: FC = () => {
	const { data: user, isLoading } = useQuery({
		queryKey: ['bids'],
		queryFn: () => UserService.getMe(),
	})

	if (!user) {
		return
	}
	if (isLoading) {
		return
	}

	return (
		<Layout>
			<section className={styles['my-bids']}>
				{/*Мои заявки*/}
				<div className={styles.main}>
					<div className='main__container'>
						<div className={styles.content}>
							<h1>
								{user?.bids.length === 0
									? 'У вас нету отправленных запросов'
									: 'Мои запросы'}
							</h1>
							<div className={styles['list-bids']}>
								{user?.bids.map((bid, index) => (
									<Bid bid={bid} key={index} />
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

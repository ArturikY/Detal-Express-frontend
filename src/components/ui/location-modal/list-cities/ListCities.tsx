import axios from '@/axios'
import { LocationContext } from '@/contexts/LocationContext'
import { FC, useContext } from 'react'
import styles from './ListCities.module.scss'

interface IListCities {
	listCities: string[]
}

export const ListCities: FC<IListCities> = ({ listCities }) => {
	const context = useContext(LocationContext)
	const chooseCity = async (city: string) => {
		window.localStorage.setItem('location', city)
		context?.setIsLocationOpen(false)

		try {
			const { data } = await axios.patch('/auth/update', {
				location: city,
			})
			console.log(data)
		} catch (err) {}
	}

	return (
		<div className={styles['list-cities']}>
			{listCities.length !== 0 ? (
				listCities.map((city, index) => (
					<div
						className={styles.city}
						key={index}
						onClick={() => chooseCity(city)}
					>
						<p>{city}</p>
					</div>
				))
			) : (
				<p>
					К сожалению ваш город не занесён в нашу базу данных. Введите полное
					название и нажмите на кнопку выбрать, а после мы занесём ваш город в
					базу.
				</p>
			)}
		</div>
	)
}

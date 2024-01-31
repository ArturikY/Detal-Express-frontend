import { FC } from 'react'
import styles from './Tooltip.module.scss'
import Image from 'next/image'
import { ITooltip } from './Tooltip.interface'
import clsx from 'clsx'

export const Tooltip: FC<ITooltip> = ({ isOpen }) => {
	const tooltipClass = clsx(styles.tooltip, {
		[styles.open]: isOpen,
	})

	return (
		<div className={tooltipClass}>
			<div className={styles.text}>
				<h5>VIN (номер кузова)</h5>
				<p className={styles.info}>
					Уникальный идентификационный номер автомобиля, содержащий информацию о
					производителе и характеристиках транспортного средства. VIN-код
					состоит из 17 символов (латинские символы и цифры).
				</p>
				<div className={styles.line}></div>
				<p className={styles.example}>Например: WVGZZZ00000000000</p>
			</div>
			<Image
				src={'/vin-example.png'}
				alt={'VIN example'}
				width={250}
				height={307}
			/>
		</div>
	)
}

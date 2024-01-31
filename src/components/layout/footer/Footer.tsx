import Link from 'next/link'
import { FC } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineMailOutline, MdOutlinePhoneInTalk } from 'react-icons/md'
import styles from './Footer.module.scss'

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			{/*Верхняя часть подвала*/}
			<div className={styles['top-footer']}>
				<div className='main__container'>
					<div className={styles.line}></div>
					<div className={styles.content}>
						<div className={styles.column}>
							<div className={styles.phone}>
								<div className={styles.icon}>
									<MdOutlinePhoneInTalk />
								</div>
								<Link href={'tel:+79194121355'}>+7 919 412 13 55</Link>
							</div>
							<div className={styles.whatsapp}>
								<div className={styles.icon}>
									<FaWhatsapp />
								</div>
								<Link href={'/'}>WhatsApp</Link>
							</div>
						</div>
						<div className={styles.column}>
							<div className={styles.email}>
								<div className={styles.icon}>
									<MdOutlineMailOutline />
								</div>
								<Link href={'mailto:poshta@mail.ru'}>poshta@mail.ru</Link>
							</div>
							<p className={styles.description}>с 7:00 до 20:00 MCK</p>
						</div>
					</div>
				</div>
			</div>
			{/*Нижняя часть подвала*/}
			<div className={styles['bottom-footer']}>
				<div className='main__container'>
					<div className={styles.content}>
						<div className={styles.column}>
							<p>&copy; 2024. Все права защищены.</p>
						</div>
						<div className={styles.column}>
							<p>ООО "АСМК"</p>
							<p>ИНН: 3327140259 ОГРН: 1183328005486</p>
						</div>
						<div className={styles.column}>
							<p>Город Москва, Нахимовский проспект, дом 27, корпус 3</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

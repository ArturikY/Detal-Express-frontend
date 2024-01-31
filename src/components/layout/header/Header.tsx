import { AuthContext } from '@/contexts/AuthContext'
import { LocationContext } from '@/contexts/LocationContext'
import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { HiLocationMarker } from 'react-icons/hi'
import { TiUserAdd } from 'react-icons/ti'
import styles from './Header.module.scss'

const Header: FC = () => {
	const [headerMini, setHeaderMini] = useState<boolean>(false)
	const headerClass = clsx(styles.header, {
		[styles.mini]: headerMini,
	})
	const AuthClass = clsx(styles.auth, {
		[styles.hidden]: window.localStorage.getItem('token'),
	})
	const ProfileClass = clsx(styles.profile, {
		[styles.hidden]: !window.localStorage.getItem('token'),
	})
	const LocationClass = clsx(styles.location, {
		[styles.hidden]: window.localStorage.getItem('location'),
	})
	const PositionClass = clsx(styles.position, {
		[styles.hidden]: !window.localStorage.getItem('location'),
	})
	const router = useRouter()
	const auhtContext = useContext(AuthContext)
	const locationContext = useContext(LocationContext)

	window.addEventListener('scroll', () => {
		if (window.scrollY > 40) {
			setHeaderMini(true)
		} else {
			setHeaderMini(false)
		}
	})

	const lagout = () => {
		window.localStorage.removeItem('token')
		router.push('/')
	}
	const changeCity = () => {
		window.localStorage.removeItem('location')
		locationContext?.setIsLocationOpen(true)
	}

	return (
		<header className={headerClass}>
			<div className='main__container'>
				<div className={styles.content}>
					<Link href={'/'}>
						<Image
							src={'/logo.svg'}
							alt={'Site logo'}
							width={150}
							height={50}
						/>
					</Link>
					<div className={styles['nav-bar']}>
						<div
							className={AuthClass}
							onClick={() => auhtContext?.setIsAuthOpen(true)}
						>
							<div className={styles.login}>
								<p>Войти</p>
							</div>
							<div className={styles.line}></div>
							<div className={styles.register}>
								<p>Создать аккаунт</p>
								<div className={styles.icon}>
									<TiUserAdd />
								</div>
							</div>
						</div>
						<div className={ProfileClass}>
							<Menu placement='bottom-end'>
								<MenuButton
									as={IconButton}
									aria-label='Options'
									icon={<FaRegUser style={{ fontSize: '24px' }} />}
									variant='outline'
								/>
								<MenuList minWidth={'140px'}>
									<MenuItem>
										<Link href={'/my-bids'}>Мои запросы</Link>
									</MenuItem>
									<MenuItem>
										<Link href={'/profile'}>Мой профиль</Link>
									</MenuItem>
									<MenuItem onClick={lagout}>
										<p>Выход</p>
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
						<div
							className={LocationClass}
							onClick={() => locationContext?.setIsLocationOpen(true)}
						>
							<HiLocationMarker />
						</div>
						<div className={PositionClass}>
							<Menu placement='bottom-end'>
								<MenuButton
									as={IconButton}
									aria-label='Options'
									icon={<HiLocationMarker style={{ fontSize: '28px' }} />}
									variant={'outline'}
								/>
								<MenuList minWidth={'140px'}>
									<MenuItem _hover={{ backgroundColor: '' }}>
										<b>{window.localStorage.getItem('location')}</b>
									</MenuItem>
									<MenuItem onClick={changeCity}>Сменить город</MenuItem>
								</MenuList>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header

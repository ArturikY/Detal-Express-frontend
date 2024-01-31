import axios from '@/axios'
import { Layout } from '@/components/layout/Layout'
import { UserService } from '@/services/User.service'
import { IBid } from '@/types/Bid.interface'
import { IncrementKey } from '@/utils/IncrementKey'
import { RandomKey } from '@/utils/RandomKey'
import { Input, Spinner, Textarea } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiLocationMarker } from 'react-icons/hi'
import { ISendBid } from './SendBid.interface'
import styles from './SendBid.module.scss'
import { LocationContext } from '@/contexts/LocationContext'

export const SendBid: FC = () => {
	const router = useRouter()

	const { data: user, isLoading: isPageLoading } = useQuery({
		queryKey: ['send-bid'],
		queryFn: () => UserService.getMe(),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISendBid>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const sendForm = async (formData: ISendBid) => {
		setIsLoading(true)
		const fields: ISendBid = {
			vin: formData.vin,
			text: formData.text,
			key: `${user?.key}-${IncrementKey(user?.bids.at(-1))}`,
		}

		try {
			const userData = await axios.patch('/auth/update', {
				login: user?.login,
				password: user?.password,
				name: user?.name,
				phone: user?.phone,
				location: `${
					window.localStorage.getItem('location')
						? window.localStorage.getItem('location')
						: ''
				}`,
				key: user?.key ? user.key : RandomKey(),
			})
			if (userData.data) {
				const { data } = await axios.post<IBid>('/bids', fields)
				if (data) {
					router.push('/my-bids')
					setIsLoading(false)
				}
			}
		} catch (err) {
			console.warn('Failed to send bid', err)
			setIsLoading(false)
		}
	}

	const context = useContext(LocationContext)

	const changeCity = () => {
		window.localStorage.removeItem('location')
		context?.setIsLocationOpen(true)
	}

	if (!user) {
		return
	}
	if (isPageLoading) {
		return
	}

	return (
		<Layout>
			<section className={styles.bid}>
				{/*Отправка заявки*/}
				<div className={styles['send-bid']}>
					<div className='main__container'>
						<div className={styles.content}>
							<h1>Отправить запрос</h1>
							<form action='#' onSubmit={handleSubmit(sendForm)}>
								{errors?.vin?.type === 'required' ? (
									<label style={{ color: '#e63946' }}>Обязательное поле</label>
								) : errors?.vin?.type === 'pattern' ? (
									<label style={{ color: '#e63946' }}>
										Введите номер корректно
									</label>
								) : errors?.vin?.type === 'maxLength' ? (
									<label style={{ color: '#e63946' }}>
										VIN-номер должен состоять из 17 символов
									</label>
								) : errors?.vin?.type === 'minLength' ? (
									<label style={{ color: '#e63946' }}>
										VIN-номер должен состоять из 17 символов
									</label>
								) : (
									<label>VIN-номер</label>
								)}
								<Input
									className={styles.input}
									textTransform={'uppercase'}
									size='lg'
									defaultValue={`${window.localStorage.getItem('vin')}`}
									_focus={{ outline: 'teal', borderColor: 'teal' }}
									{...register('vin', {
										required: true,
										pattern: /^[a-zA-Z0-9]+$/,
										minLength: 17,
										maxLength: 17,
									})}
								/>
								{errors?.text ? (
									<label style={{ color: '#e63946' }}>Обязательное поле!</label>
								) : (
									<label>Укажите список запчастей</label>
								)}
								<Textarea
									placeholder='Двигатель, шины, диски'
									{...register('text', { required: true })}
								/>
								<div className={styles.location}>
									<HiLocationMarker />
									{''}
									<p>
										Местоположение:{' '}
										<b onClick={changeCity}>
											{window.localStorage.getItem('location')}
										</b>
									</p>
								</div>
								<div className={styles['inputs-group']}>
									<div className={styles.group}>
										<label>Номер телефона</label>
										<Input
											placeholder='Ваш номер'
											size='lg'
											defaultValue={`${user?.phone}`}
											_focus={{ outline: 'teal', borderColor: 'teal' }}
										/>
									</div>
									<div className={styles.group}>
										<label>Имя</label>
										<Input
											placeholder='Ваше имя'
											size='lg'
											defaultValue={`${user?.name}`}
											_focus={{ outline: 'teal', borderColor: 'teal' }}
										/>
									</div>
								</div>
								<div className={styles['btn-container']}>
									<button className='send-bid-btn'>
										{isLoading ? <Spinner size='lg' /> : 'Отправить заявку'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

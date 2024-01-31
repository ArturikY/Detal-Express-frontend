import axios from '@/axios'
import { Layout } from '@/components/layout/Layout'
import { IRegisterForm } from '@/components/ui/auth-modal/forms/register-form/RegisterForm.interface'
import { UserService } from '@/services/User.service'
import { IUser } from '@/types/User.interface'
import { RandomKey } from '@/utils/RandomKey'
import {
	Input,
	InputGroup,
	InputRightAddon,
	Spinner,
	useToast,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Profile.module.scss'

export const Profile: FC = () => {
	const { data: user, isLoading: isLoadingPage } = useQuery({
		queryKey: ['user'],
		queryFn: () => UserService.getMe(),
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterForm>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	// const [currentInfo, setCurrentInfo] = useState(user?)
	const toast = useToast()

	const sendForm = async (formData: IRegisterForm) => {
		setIsLoading(true)
		const fields: IRegisterForm = {
			login: formData.login,
			password: formData.password,
			name: formData.name,
			phone: formData.phone,
			// CHANGE
			location: `${
				window.localStorage.getItem('location')
					? window.localStorage.getItem('location')
					: ''
			}`,
			key: user?.key ? user.key : RandomKey(),
		}

		try {
			const { data } = await axios.patch<IUser>('/auth/update', fields)
			console.log(data)
			setIsLoading(false)
			toast({
				title: 'Изменения сохранены',
				status: 'success',
				duration: 9000,
				isClosable: true,
			})
		} catch (err) {
			console.warn('Failed to update', err)
			setIsLoading(false)
		}
	}

	if (!user) {
		return
	}
	if (isLoadingPage) {
		return
	}

	return (
		<Layout>
			<section className={styles.profile}>
				{/*Профиль*/}
				<div className={styles['personal-account']}>
					<div className='main__container'>
						<div className={styles.content}>
							<h1>Мой профиль</h1>
							<form action='#' onSubmit={handleSubmit(sendForm)}>
								{errors?.name ? (
									<label style={{ color: '#e63946' }}>Обязательное поле!</label>
								) : (
									<label>Имя</label>
								)}
								<InputGroup>
									<Input
										placeholder='Ваше имя'
										size='lg'
										defaultValue={`${user?.name}`}
										{...register('name', { required: true })}
									/>
									<InputRightAddon className={styles.addition}>
										{`# ${user?.key}`}
									</InputRightAddon>
								</InputGroup>
								{errors?.phone?.type === 'required' ? (
									<label style={{ color: '#e63946' }}>Обязательное поле!</label>
								) : errors?.phone?.type === 'pattern' ? (
									<label style={{ color: '#e63946' }}>
										Введите номер корректно
									</label>
								) : (
									<label>Номер телефона</label>
								)}
								<Input
									placeholder='Ваш номер'
									size='lg'
									defaultValue={`${user?.phone}`}
									_focus={{ outline: 'teal', borderColor: 'teal' }}
									{...register('phone', {
										required: true,
										pattern: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
									})}
								/>
								{errors?.login?.type === 'required' ? (
									<label style={{ color: '#e63946' }}>Обязательное поле!</label>
								) : errors?.login?.type === 'pattern' ? (
									<label style={{ color: '#e63946' }}>
										Введите e-mail корректно
									</label>
								) : (
									<label>E-mail</label>
								)}
								<Input
									placeholder='Ваш email'
									size='lg'
									defaultValue={`${user?.login}`}
									_focus={{ outline: 'teal', borderColor: 'teal' }}
									{...register('login', {
										required: true,
										pattern:
											/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
									})}
								/>
								{errors?.password?.type === 'required' ? (
									<label style={{ color: '#e63946' }}>Обязательное поле!</label>
								) : errors?.password?.type === 'minLength' ? (
									<label style={{ color: '#e63946' }}>
										Пароль должен содержать 5 символов
									</label>
								) : (
									<label>Пароль</label>
								)}
								<Input
									placeholder='Ваш пароль'
									size='lg'
									defaultValue={`${user?.password}`}
									_focus={{ outline: 'teal', borderColor: 'teal' }}
									{...register('password', { required: true, minLength: 5 })}
								/>
								<div className={styles['btn-container']}>
									<button className={'profile-btn'}>
										{isLoading ? (
											<Spinner size={'lg'} />
										) : (
											'Сохранить изменения'
										)}
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

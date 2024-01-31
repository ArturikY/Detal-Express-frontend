import axios from '@/axios'
import { AuthContext } from '@/contexts/AuthContext'
import { IUser } from '@/types/User.interface'
import { RandomKey } from '@/utils/RandomKey'
import {
	FormControl,
	FormLabel,
	Input,
	ModalBody,
	ModalFooter,
	Spinner,
	useBreakpointValue,
} from '@chakra-ui/react'
import { FC, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IRegisterForm } from './RegisterForm.interface'

export const RegisterForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterForm>()
	const context = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)

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
			key: RandomKey(),
		}

		try {
			// const { data } = await axios.post<IUser>('/auth/login', formData)
			const { data } = await axios.post<IUser>('/auth/register', fields)

			if ('token' in data) {
				window.localStorage.setItem('token', data.token)
				context?.setIsAuthOpen(false)
				setIsLoading(false)
			} else {
				console.warn('Failed to register')
				setIsLoading(false)
			}
		} catch (err) {
			console.warn('Failed to register', err)
			setIsLoading(false)
		}
	}

	const padding = useBreakpointValue({ base: '0 12px', sm: '0 24px' })

	return (
		<form action='#' onSubmit={handleSubmit(sendForm)}>
			<ModalBody p={padding}>
				<FormControl>
					{errors?.login?.type === 'required' ? (
						<FormLabel ml={1} color={'#e63946'}>
							Обязательное поле!
						</FormLabel>
					) : errors?.login?.type === 'pattern' ? (
						<FormLabel ml={1} color={'#e63946'}>
							Введите e-mail корректно
						</FormLabel>
					) : (
						<FormLabel ml={1}>E-mail</FormLabel>
					)}
					<Input
						placeholder='E-mail'
						{...register('login', {
							required: true,
							pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
						})}
					/>
				</FormControl>
				<FormControl mt={4}>
					{errors?.password ? (
						<FormLabel ml={1} color={'#e63946'}>
							Обязательное поле!
						</FormLabel>
					) : errors?.password?.type === 'minLength' ? (
						<FormLabel ml={1} color={'#e63946'}>
							Пароль должен содержать 5 символов
						</FormLabel>
					) : (
						<FormLabel ml={1}>Пароль</FormLabel>
					)}
					<Input
						placeholder='Пароль'
						{...register('password', { required: true, minLength: 5 })}
					/>
				</FormControl>
				<FormControl mt={4}>
					{errors?.name ? (
						<FormLabel ml={1} color={'#e63946'}>
							Обязательное поле!
						</FormLabel>
					) : (
						<FormLabel ml={1}>Имя</FormLabel>
					)}
					<Input placeholder='Имя' {...register('name', { required: true })} />
				</FormControl>
				<FormControl mt={4}>
					{errors?.phone?.type === 'required' ? (
						<FormLabel ml={1} color={'#e63946'}>
							Обязательное поле!
						</FormLabel>
					) : errors?.phone?.type === 'pattern' ? (
						<FormLabel ml={1} color={'#e63946'}>
							Введите номер корректно
						</FormLabel>
					) : (
						<FormLabel ml={1}>Номер телефона</FormLabel>
					)}
					<Input
						placeholder='Номер телефона'
						{...register('phone', {
							required: true,
							pattern: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
						})}
					/>
				</FormControl>
			</ModalBody>
			<ModalFooter justifyContent={'center'}>
				<button className='register-btn'>
					{isLoading ? <Spinner size={'sm'} /> : 'Зарегестрироваться'}
				</button>
			</ModalFooter>
		</form>
	)
}

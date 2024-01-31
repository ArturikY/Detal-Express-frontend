import axios from '@/axios'
import { AuthContext } from '@/contexts/AuthContext'
import { IUser } from '@/types/User.interface'
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
import { ILoginForm } from './LoginForm.interface'

export const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>()
	const [resError, setResError] = useState<boolean>(false)
	const context = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const sendForm = async (formData: ILoginForm) => {
		setResError(false)
		setIsLoading(true)
		try {
			// const { data } = await axios.post<IUser>('/auth/login', formData)
			const { data } = await axios.post<IUser>('/auth/login', formData)

			if ('token' in data) {
				window.localStorage.setItem('token', data.token)
				context?.setIsAuthOpen(false)
				setIsLoading(false)
			} else {
				console.warn('Failed to login')
				setIsLoading(false)
			}
		} catch (err) {
			setResError(true)
			setIsLoading(false)
			console.warn('Failed to login', err)
		}
	}
	const padding = useBreakpointValue({ base: '0 12px', sm: '0 24px' })

	return (
		<form action='#' onSubmit={handleSubmit(sendForm)}>
			<ModalBody p={padding}>
				<FormControl>
					{errors?.login ? (
						<FormLabel ml={1} color={'#e63946'}>
							Обязательное поле!
						</FormLabel>
					) : resError ? (
						<FormLabel ml={1} color={'#e63946'}>
							Неправильный логин или пароль
						</FormLabel>
					) : (
						<FormLabel ml={1}>E-mail</FormLabel>
					)}
					<Input
						placeholder='E-mail'
						{...register('login', { required: true })}
					/>
				</FormControl>
				<FormControl mt={4}>
					{errors?.password ? (
						<FormLabel ml={1} color={'#e63946'}>
							Обязательное поле!
						</FormLabel>
					) : resError ? (
						<FormLabel ml={1} color={'#e63946'}>
							Неправильный логин или пароль
						</FormLabel>
					) : (
						<FormLabel ml={1}>Пароль</FormLabel>
					)}
					<Input
						placeholder='Пароль'
						{...register('password', { required: true })}
					/>
				</FormControl>
			</ModalBody>
			<ModalFooter justifyContent={'center'}>
				<button className='login-btn'>
					{isLoading ? <Spinner size='xs' /> : 'Войти'}
				</button>
			</ModalFooter>
		</form>
	)
}

import { AuthContext } from '@/contexts/AuthContext'
import {
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { FC, useContext, useState } from 'react'
import styles from './AuthModal.module.scss'
import { LoginForm } from './forms/login-form/LoginForm'
import { RegisterForm } from './forms/register-form/RegisterForm'

export const AuthModal: FC = () => {
	const { onClose } = useDisclosure()
	const [status, setStatus] = useState<string>('login')
	const [test, setTest] = useState<boolean>(false)
	// const loginFormClass = clsx(styles['login-form'], {
	// 	hidden: status !== 'login',
	// })
	const context = useContext(AuthContext)

	return (
		<div className={styles['auth-modal']}>
			<Modal
				isOpen={context?.isAuthOpen ? context?.isAuthOpen : test}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader display={'flex'} gap={'6px'} fontSize={'22px'}>
						<Text
							transition={'linear'}
							transitionDuration={'0.3s'}
							transitionProperty={'color'}
							_hover={{ color: 'teal' }}
							color={status === 'login' ? 'teal' : ''}
							cursor={'pointer'}
							onClick={() => setStatus('login')}
						>
							Вход
						</Text>{' '}
						/{' '}
						<Text
							transition={'linear'}
							transitionDuration={'0.3s'}
							transitionProperty={'color'}
							_hover={{ color: 'teal' }}
							color={status === 'register' ? 'teal' : ''}
							cursor={'pointer'}
							onClick={() => setStatus('register')}
						>
							Регистрация
						</Text>
					</ModalHeader>
					<ModalCloseButton onClick={() => context?.setIsAuthOpen(false)} />
					{status === 'login' ? <LoginForm /> : <RegisterForm />}
				</ModalContent>
			</Modal>
		</div>
	)
}

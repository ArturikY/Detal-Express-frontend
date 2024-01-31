import { Layout } from '@/components/layout/Layout'
import { Tooltip } from '@/components/ui/tooltip/Tooltip'
import { QuestionsData } from '@/content/Questions.data'
import { StagesData } from '@/content/Stages.data'
import { AuthContext } from '@/contexts/AuthContext'
import { ITextContent } from '@/types/TextContent.interface'
import { IVin } from '@/types/Vin.interface'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaQuestionCircle } from 'react-icons/fa'
import styles from './Home.module.scss'

export const Home: FC = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IVin>()
	const [isOpenTooltip, setIsOpenTooltip] = useState<boolean>(false)

	const context = useContext(AuthContext)

	const sendBid = (formData: IVin) => {
		if (window.localStorage.getItem('token')) {
			router.push('/send-bid')
			window.localStorage.setItem('vin', `${formData.vin}`.toUpperCase())
		} else {
			context?.setIsAuthOpen(true)
		}
	}

	return (
		<Layout>
			<section className={styles.home}>
				{/* Заявка */}
				<div className={styles.bid}>
					<div className='main__container'>
						<div className={styles.bid__content}>
							<h1>Вам нужны автозапчасти?</h1>
							<h3>Давайте подберём для вас лучшие предложения</h3>
							<form action='#' onSubmit={handleSubmit(sendBid)}>
								<FormControl>
									{errors?.vin?.type === 'required' ? (
										<FormLabel className={styles.label} color={'#e63946'}>
											Обязательное поле
										</FormLabel>
									) : errors?.vin?.type === 'pattern' ? (
										<FormLabel className={styles.label} color={'#e63946'}>
											Введите номер корректно
										</FormLabel>
									) : errors?.vin?.type === 'maxLength' ? (
										<FormLabel className={styles.label} color={'#e63946'}>
											VIN-номер должен состоять из 17 символов
										</FormLabel>
									) : errors?.vin?.type === 'minLength' ? (
										<FormLabel className={styles.label} color={'#e63946'}>
											VIN-номер должен состоять из 17 символов
										</FormLabel>
									) : (
										<FormLabel className={styles.label}>VIN-номер</FormLabel>
									)}
									<InputGroup>
										<Input
											className={styles.input}
											placeholder='WVGZZZ00000000000'
											size='lg'
											textTransform={'uppercase'}
											_focus={{ outline: 'teal', borderColor: 'teal' }}
											{...register('vin', {
												required: true,
												pattern: /^[a-zA-Z0-9]+$/,
												minLength: 17,
												maxLength: 17,
											})}
										/>
										<InputRightElement
											className={styles['right-elem']}
											onMouseEnter={() => setIsOpenTooltip(true)}
											onMouseLeave={() => setIsOpenTooltip(false)}
										>
											<p>Что такое VIN</p>
											<FaQuestionCircle fontSize={'16px'} />
										</InputRightElement>
									</InputGroup>
								</FormControl>
								<div className={styles['btn-container']}>
									<button className='send-bid-btn'>Отправить запрос</button>
								</div>
							</form>
							<p className={styles.response}>
								Примерное время ожидания ответа 3-10 минут
							</p>
							<div className={styles.tooltip}>
								<Tooltip isOpen={isOpenTooltip} />
							</div>
						</div>
					</div>
				</div>

				{/* Этапы оформления */}
				<div className={styles.stages}>
					<div className='main__container'>
						<div className={styles.stages__content}>
							<h1>Этапы оформления:</h1>
							<div className={styles['list-pages']}>
								{StagesData.map((stage: ITextContent, index) => (
									<div className={styles.stage} key={index + 1}>
										<div className={styles.number}>
											<span>{index + 1}</span>
										</div>
										<div className={styles.text}>
											<h4>{stage.title}</h4>
											<p>{stage.text}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Ответы на часто задаваемые вопросы */}
				<div className={styles.questions}>
					<div className='main__container'>
						<h1>
							<b>Ответы</b> на частые вопросы
						</h1>
						<Accordion allowMultiple className={styles.accordions}>
							{QuestionsData.map((question: ITextContent, index) => (
								<AccordionItem className={styles.item} key={index}>
									<div>
										<AccordionButton
											_expanded={{ color: '#c59368' }}
											_hover={{ background: '#ffffff' }}
										>
											<Box as='span' flex='1' textAlign='left'>
												<h4>{question.title}</h4>
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</div>
									<AccordionPanel pb={4} className={styles.text}>
										{question.text}
									</AccordionPanel>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</section>
		</Layout>
	)
}

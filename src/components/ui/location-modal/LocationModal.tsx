import { LocationContext } from '@/contexts/LocationContext'
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react'
import { FC, useContext, useRef, useState } from 'react'
import { ListCities } from './list-cities/ListCities'
import { ListCitiesData } from './list-cities/ListCities.data'

export const LocationModal: FC = () => {
	const { onClose } = useDisclosure()
	const [test, setTest] = useState<boolean>(false)
	const [currentStr, setCurrentStr] = useState<string>('')
	const context = useContext(LocationContext)

	// const [listCities, setListCities] = useState<string[]>([...ListCitiesData])
	const [currentList, setCurrentList] = useState<string[]>([...ListCitiesData])

	const filteringList = (currentStr: string) => {
		const firstLetter = currentStr.charAt(0)
		const firstLetterCap = firstLetter.toUpperCase()
		const remainingLetters = currentStr.slice(1)
		const substr = firstLetterCap + remainingLetters
		currentList.length = 0
		for (let city of ListCitiesData) {
			if (city.startsWith(substr)) {
				currentList.push(city)
				setCurrentList([...currentList])
			} else {
				currentList.splice(currentList.indexOf(city), currentList.indexOf(city))
				setCurrentList([...currentList])
			}
		}
	}

	const inputRef = useRef<HTMLInputElement>(null)
	const chooseCity = () => {
		window.localStorage.setItem('location', currentStr)
		context?.setIsLocationOpen(false)
	}

	const fontSize = useBreakpointValue({ base: '18px', sm: '20px' })

	return (
		<Modal
			isOpen={context?.isLocationOpen ? context?.isLocationOpen : test}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize={'22px'} pb={1}>
					Выбор города
				</ModalHeader>
				<ModalCloseButton onClick={() => context?.setIsLocationOpen(false)} />
				<ModalBody p={3}>
					<InputGroup size='md'>
						<Input
							placeholder='Введите свой город'
							p={'25px 15px'}
							fontSize={fontSize}
							fontWeight={'600'}
							onChange={e => {
								filteringList(e.target.value)
								setCurrentStr(e.target.value)
							}}
							ref={inputRef}
						/>
						<InputRightElement width='5.5rem'>
							<Button
								h={'2.5rem'}
								mt={'12px'}
								mr={'6px'}
								_hover={{ bgColor: '#fffffff' }}
								onClick={chooseCity}
							>
								Выбрать
							</Button>
						</InputRightElement>
					</InputGroup>
					<ListCities listCities={currentList} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

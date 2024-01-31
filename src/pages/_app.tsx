import { AuthContext } from '@/contexts/AuthContext'
import { LocationContext } from '@/contexts/LocationContext'
import '@/styles/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()
	const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
	const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false)

	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<AuthContext.Provider value={{ isAuthOpen, setIsAuthOpen }}>
					<LocationContext.Provider
						value={{ isLocationOpen, setIsLocationOpen }}
					>
						<Component {...pageProps} />
					</LocationContext.Provider>
				</AuthContext.Provider>
			</QueryClientProvider>
		</ChakraProvider>
	)
}

import { useBreakpointValue, useColorMode, VStack } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Tiles } from '../components/Tiles'

const Index = () => {
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false })

  return (
    <VStack
      spacing='3rem'
      maxW={isMobile ? '100%' : '80%'}
      mx={isMobile ? '2rem' : 'auto'}
    >
      <Header />
      <Tiles />
    </VStack>
  )
}

export default Index

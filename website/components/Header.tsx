import {
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { Button, Link } from '@opengovsg/design-system-react'

export const Header = () => {
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false })
  // Mobile view - stack vertically
  if (isMobile) {
    return (
      <VStack w="100%" spacing="1.5rem">
        <Image maxW='12rem' src='UnboringSG.png' alt='UnboringSG logo' />
        <Flex flexDir={'row'} alignItems="flex-start" mr='1rem'>
          <Link href='https://go.gov.sg/unboringsg' target={'_blank'}>
            <Button>Add to the list</Button>
          </Link>
        </Flex>
      </VStack>
    )
  }
  return (
    <SimpleGrid columns={3} mt='1rem' w='100%'>
      <Spacer />
      <Center>
        <Image maxW='24rem' src='UnboringSG.png' alt='UnboringSG logo' />
      </Center>
      <Flex flexDir={'row'} justifyContent={'flex-end'} mr='3rem'>
        <Link href='https://go.gov.sg/unboringsg' target={'_blank'}>
          <Button>Add to the list</Button>
        </Link>
      </Flex>
    </SimpleGrid>
  )
}

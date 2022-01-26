import {
  Box,
  Center,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import { definitions } from '../../types/supabase'
import { LoadedRec } from './LoadedRec'

interface RecProps {
  isLoading: boolean
  rec: definitions['recommendations'] | null
}

export const Rec = ({ isLoading, rec }: RecProps) => {
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false })

  if (isLoading) {
    return <Skeleton h='100%' w='100%' />
  }
  return (
    <Box
      backgroundColor={isLight ? 'gray.100' : 'white'}
      borderRadius={'1rem'}
      h='100%'
    >
      {rec ? (
        <LoadedRec rec={rec} />
      ) : (
        <Center h='100%' mx={isMobile ? '2rem' : '4rem'} textAlign={'center'}>
          <Text textStyle='body-1' color='neutral.700'>
            That's all for now, check back later!
          </Text>
        </Center>
      )}
    </Box>
  )
}

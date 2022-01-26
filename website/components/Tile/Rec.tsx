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
  handleClick: (
    event?: 'increment_clicks' | 'increment_downvotes',
  ) => Promise<void>
}

export const Rec = ({ isLoading, rec, handleClick }: RecProps) => {
  const { colorMode } = useColorMode()
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false })

  if (isLoading) {
    return <Skeleton h='100%' w='100%' />
  }
  return (
    <Box h='100%'>
      {rec ? (
        <LoadedRec rec={rec} handleClick={handleClick} />
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

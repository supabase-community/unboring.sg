import { Flex, Image, SimpleGrid } from '@chakra-ui/react'
import { definitions } from '../../types/supabase'
import { RecText } from './RecText'

interface LoadedRecProps {
  rec: definitions['recommendations']
}

export const LoadedRec = ({ rec }: LoadedRecProps) => {
  return (
    <SimpleGrid columns={1} templateRows='1fr 1fr' h='100%'>
      <Flex mx='auto' my='auto' maxH='100%' maxW='100%'>
        <Image src={rec.image_url} maxH='100%' maxW='100%' />
      </Flex>
      <RecText rec={rec} />
    </SimpleGrid>
  )
}

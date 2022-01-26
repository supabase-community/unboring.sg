import { Flex, Image, SimpleGrid } from '@chakra-ui/react'
import { Link } from '@opengovsg/design-system-react'
import { definitions } from '../../types/supabase'
import { RecText } from './RecText'

interface LoadedRecProps {
  rec: definitions['recommendations']
  handleClick: (
    event?: 'increment_clicks' | 'increment_downvotes',
  ) => Promise<void>
}

export const LoadedRec = ({ rec, handleClick }: LoadedRecProps) => {
  return (
    <SimpleGrid columns={1} templateRows='1fr 1fr' h='100%'>
      <Link
        style={{ textDecoration: 'none' }}
        href={rec.url}
        onClick={() => handleClick('increment_clicks')}
        target='_blank'
      >
        <Flex mx='auto' my='auto' maxH='100%' maxW='100%'>
          <Image src={rec.image_url} maxH='100%' maxW='100%' />
        </Flex>
      </Link>
      <Link
        style={{ textDecoration: 'none' }}
        href={rec.url}
        onClick={() => handleClick('increment_clicks')}
        target='_blank'
      >
        <RecText rec={rec} />
      </Link>
    </SimpleGrid>
  )
}

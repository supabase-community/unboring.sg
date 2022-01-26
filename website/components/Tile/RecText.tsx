import { Flex, Text } from '@chakra-ui/react'
import { definitions } from '../../types/supabase'

interface RecTextProps {
  rec: definitions['recommendations']
}

export const RecText = ({ rec }: RecTextProps) => {
  return (
    <Flex flexDir={'column'} px='1.5rem' pt='1rem' pb='2rem'>
      <Text textStyle='subhead-2' color='primary.500'>
        {(rec.cost ?? ' ').toUpperCase()}
      </Text>
      <Text textStyle='h2' color='neutral.800'>
        {rec.title}
      </Text>
      <Text textStyle='body-1' color='neutral.800'>
        {rec.description}
      </Text>
    </Flex>
  )
}

import { SimpleGrid } from '@chakra-ui/react'
import { Tile } from './Tile'

const TILE_TITLES = ['EAT', 'DO', 'LEARN']

export const Tiles = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
      w='100%'
      spacing={'2rem'}
    >
      {TILE_TITLES.map((title, idx) => (
        <Tile title={title} key={idx} />
      ))}
    </SimpleGrid>
  )
}

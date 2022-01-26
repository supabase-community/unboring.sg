import {
  CSSObject,
  Flex,
  Image,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'

export const Footer = () => {
  const { colorMode } = useColorMode()
  return (
    <Flex pb='2rem'>
      <Image
        htmlWidth='150px'
        src={`ogp_logo_${colorMode}.svg`}
        alt='OGP Logo'
      />
      <Image htmlWidth='90px' src='stb_logo.svg' alt='STB Logo' pl={2} />
    </Flex>
  )
}

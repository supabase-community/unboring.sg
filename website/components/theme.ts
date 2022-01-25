import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { theme as ogpTheme } from '@opengovsg/design-system-react'

const config: ThemeConfig = {
  useSystemColorMode: true,
}

export const theme = extendTheme(
  ogpTheme,
  { config },
)

import { Box, Image, Heading, Stack } from "@chakra-ui/react";

export const Tile = ({ title }) => (
  <Stack>
    <Heading color="#276EF1" as="h1" size="4xl" isTruncated>
      {title}
    </Heading>
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={"https://bit.ly/2Z4KKcF"} alt={"test"} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {`Title`}
        </Box>

        <Box>{`Description`}</Box>
      </Box>
    </Box>
  </Stack>
);

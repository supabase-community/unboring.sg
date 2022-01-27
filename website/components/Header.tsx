import { StarIcon } from "@chakra-ui/icons";
import {
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { Button, Link } from "@opengovsg/design-system-react";

export const Header = () => {
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false });
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  // Mobile view - stack vertically
  if (isMobile) {
    return (
      <VStack w="100%" spacing="1.5rem">
        <Image maxW="12rem" src="UnboringSG.png" alt="UnboringSG logo" />
        <Flex flexDir={"column"} alignItems="flex-start" mr="1rem">
          <Link href="/bookmark" mb={2} style={{ textDecoration: "none" }}>
            <StarIcon
              color={isLight ? "black" : "white"}
              fontSize="1.25rem"
              mr={2}
            />
            <Heading
              as="h1"
              color={isLight ? "black" : "white"}
              fontSize="1.25rem"
            >
              Bookmark
            </Heading>
          </Link>
          <Link href="https://go.gov.sg/unboringsg" target={"_blank"}>
            <Button>Add to the list</Button>
          </Link>
        </Flex>
      </VStack>
    );
  }
  return (
    <SimpleGrid columns={3} mt="1rem" w="100%">
      <Flex>
        <Link href="/bookmark" style={{ textDecoration: "none" }}>
          <StarIcon
            color={isLight ? "black" : "white"}
            fontSize="1.75rem"
            mr={2}
          />
          <Heading
            as="h1"
            color={isLight ? "black" : "white"}
            fontSize="1.75rem"
          >
            Bookmark
          </Heading>
        </Link>
      </Flex>
      <Center>
        <Image maxW="24rem" src="UnboringSG.png" alt="UnboringSG logo" />
      </Center>
      <Flex flexDir={"row"} justifyContent={"flex-end"}>
        <Link href="https://go.gov.sg/unboringsg" target={"_blank"}>
          <Button>Add to the list</Button>
        </Link>
      </Flex>
    </SimpleGrid>
  );
};

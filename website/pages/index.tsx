import { SimpleGrid, Image, useColorMode, Flex } from "@chakra-ui/react";

import { Screen } from "../components/Screen";
import { Tile } from "../components/Tile";

const Index = () => {
  const { colorMode } = useColorMode();

  return (
    <Screen minH="100vh" p={5}>
      <Image
        htmlWidth="20%"
        position="fixed"
        top="0"
        src="UnboringSG.png"
        alt="UnboringSG logo"
      />
      <SimpleGrid maxW="100%" minChildWidth="350px" spacing={5}>
        <Tile title={"EAT"} />
        <Tile title={"DO"} />
        <Tile title={"LEARN"} />
      </SimpleGrid>
      <Flex position="fixed" bottom="1rem" right="1rem">
        <Image
          htmlWidth="150px"
          src={`ogp_logo_${colorMode}.svg`}
          alt="OGP Logo"
        />
        <Image htmlWidth="90px" src="stb_logo.svg" alt="STB Logo" pl={2} />
      </Flex>
    </Screen>
  );
};

export default Index;

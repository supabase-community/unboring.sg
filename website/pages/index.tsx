import { SimpleGrid, Image, useColorMode } from "@chakra-ui/react";

import { Screen } from "../components/Screen";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Tile } from "../components/Tile";

const Index = () => {
  const { colorMode } = useColorMode();

  return (
    <Screen minH="100vh" p={5}>
      <DarkModeSwitch />
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
      <Image
        htmlWidth="150px"
        position="fixed"
        bottom="1rem"
        right="1rem"
        src={`ogp_logo_${colorMode}.svg`}
        alt="OGP Logo"
      />
    </Screen>
  );
};

export default Index;

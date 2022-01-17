import { SimpleGrid, Image, Box } from "@chakra-ui/react";

import { Screen } from "../components/Screen";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Tile } from "../components/Tile";

const Index = () => {
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
    </Screen>
  );
};

export default Index;

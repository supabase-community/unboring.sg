import { Text, SimpleGrid, Box, Container } from "@chakra-ui/react";

import { Screen } from "../components/Screen";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Tile } from "../components/Tile";

const Index = () => {
  return (
    <Screen minH="100vh" p={5}>
      <DarkModeSwitch />
      <SimpleGrid maxW="100%" minChildWidth="350px" spacing={5}>
        <Tile title={"EAT"} />
        <Tile title={"DO"} />
        <Tile title={"LEARN"} />
      </SimpleGrid>
    </Screen>
  );
};

export default Index;

import { Text, SimpleGrid, Box, Container } from "@chakra-ui/react";

import { Screen } from "../components/Screen";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Tile } from "../components/Tile";

const Index = () => {
  return (
    <Screen height="100vh">
      <DarkModeSwitch />
      <Container maxW="100%" centerContent>
        <SimpleGrid columns={3} spacing={5}>
          <Tile title={"EAT"} />
          <Tile title={"DO"} />
          <Tile title={"LEARN"} />
        </SimpleGrid>
      </Container>
    </Screen>
  );
};

export default Index;

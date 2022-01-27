import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Link,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { Rec } from "../components/Tile/Rec";
import { localStorageParser } from "../utils/supabase";

const TILE_TITLES = ["EAT", "DO", "LEARN"];

const Bookmark = () => {
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false });
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <VStack maxW={isMobile ? "100%" : "80%"} mx={isMobile ? "2rem" : "auto"}>
      <Flex w="100%" mt="1rem">
        <Link href="/" style={{ textDecoration: "none" }}>
          <ArrowBackIcon
            color={isLight ? "black" : "white"}
            fontSize="1.75rem"
            mr={2}
          />
        </Link>
        <Tabs w="100%">
          <TabList w="100%">
            {TILE_TITLES.map((title) => (
              <Tab>{title}</Tab>
            ))}
          </TabList>

          <TabPanels w="100%">
            {TILE_TITLES.map((title) => (
              <TabPanel w="100%">
                <SimpleGrid w="100%" spacing={"2rem"} minChildWidth="300px">
                  {typeof window !== "undefined"
                    ? localStorageParser
                        .getItem(`unboringRecs-bookmark-${title}`)
                        .map((rec) => <Rec maxW="30rem" rec={rec} />)
                    : []}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
      <Footer />
    </VStack>
  );
};

export default Bookmark;

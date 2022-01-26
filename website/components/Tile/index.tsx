import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  SimpleGrid,
  HStack,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "@opengovsg/design-system-react";
import { ThumbDownIcon } from "../ThumbDownIcon";
import { Rec } from "./Rec";
import { useRecs } from "./useRecs";

const sentenceCase = (s: string) => s[0] + s.slice(1).toLowerCase();

export const Tile = ({ title }: { title: string }) => {
  const { handleClick, currentRec, isLoading } = useRecs(title);
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false });

  return (
    <SimpleGrid columns={1} templateRows="1fr 5fr" h="60vh">
      <HStack w="100%" maxW="30rem" justifyContent={"space-between"}>
        <Text textStyle={isMobile ? "display-2-mobile" : "display-2"}>
          {sentenceCase(title)}
        </Text>
        <HStack spacing="1rem">
          <Link onClick={() => handleClick("increment_downvotes")}>
            <ThumbDownIcon
              color={isLight ? "black" : "white"}
              fontSize={isMobile ? "1.5rem" : "2rem"}
            />
          </Link>
          <Link onClick={() => handleClick()}>
            <RepeatIcon
              color={isLight ? "black" : "white"}
              fontSize={isMobile ? "1.5rem" : "2rem"}
            />
          </Link>
        </HStack>
      </HStack>
      <Rec
        title={title}
        rec={currentRec}
        isLoading={isLoading}
        handleClick={handleClick}
        backgroundColor={isLight ? "gray.100" : "white"}
        borderTopRadius={"1rem"}
        maxW="30rem"
      />
    </SimpleGrid>
  );
};

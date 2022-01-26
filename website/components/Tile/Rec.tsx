import {
  Box,
  Center,
  Flex,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { definitions } from "../../types/supabase";
import { LoadedRec } from "./LoadedRec";
import { useRecs } from "./useRecs";

interface RecProps {
  isLoading: boolean;
  rec: definitions["recommendations"] | null;
  handleClick: (
    event?: "increment_clicks" | "increment_downvotes"
  ) => Promise<void>;
}

export const Rec = (props) => {
  const { currentRec, handleClick, isLoading } = useRecs(props.title);
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, xs: true, md: false });

  if (isLoading) {
    return <Skeleton h="100%" w="100%" />;
  }
  return (
    <Flex {...props}>
      {currentRec ? (
        <LoadedRec rec={currentRec} handleClick={handleClick} />
      ) : (
        <Center h="100%" mx={isMobile ? "2rem" : "4rem"} textAlign={"center"}>
          <Text textStyle="body-1" color="neutral.700">
            That's all for now, check back later!
          </Text>
        </Center>
      )}
    </Flex>
  );
};

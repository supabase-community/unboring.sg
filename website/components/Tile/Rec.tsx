import { Center, Flex, Skeleton, Text } from "@chakra-ui/react";
import { LoadedRec } from "./LoadedRec";

export const Rec = (props) => {
  const { isLoading, rec } = props;
  if (isLoading) {
    return <Skeleton h="100%" w="100%" />;
  }
  return (
    <Flex width="100%">
      {rec ? (
        <LoadedRec {...props} />
      ) : (
        <Center {...props} w="100%" h="100%" textAlign={"center"}>
          <Text textStyle="body-1" color="neutral.700">
            That's all for now, check back later!
          </Text>
        </Center>
      )}
    </Flex>
  );
};

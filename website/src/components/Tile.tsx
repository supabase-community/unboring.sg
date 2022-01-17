import { useEffect, useState } from "react";
import { Flex, Box, Image, Heading, Stack, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Link } from "@opengovsg/design-system-react";
import {
  getRecommendations,
  localStorageParser,
  supabaseClient,
} from "../../utils/supabase";
import { definitions } from "../../types/supabase";
import { ThumbDownIcon } from "./ThumbDownIcon";

export const Tile = ({ title }: { title: string }) => {
  const [recs, setRecs] = useState<definitions["recommendations"][]>([]);
  const [currentRec, setCurrentRec] = useState<
    definitions["recommendations"] | null
  >(null);

  const recsLoader = async () => {
    const recommendations = await getRecommendations(
      title.toLowerCase(),
      currentRec
        ? currentRec.id
        : Number(
            window.localStorage.getItem(`unboringRecs-lastSeenId-${title}`)
          )
    );
    setCurrentRec(recommendations.shift());
    setRecs(recommendations);
    localStorageParser.setItem(`unboringRecs-${title}`, recommendations);
  };

  useEffect(() => {
    const recommendations = localStorageParser.getItem(`unboringRecs-${title}`);
    if (recommendations.length) {
      setCurrentRec(recommendations.shift());
      setRecs(recommendations);
      localStorageParser.setItem(`unboringRecs-${title}`, recommendations);
    } else recsLoader();
  }, []);

  const handleClick = async (
    event?: "increment_clicks" | "increment_downvotes"
  ) => {
    if (event) {
      // Increment in DB
      const { error } = await supabaseClient.rpc(event, {
        rec_id: currentRec.id,
      });
      if (error) console.log(error);
    }
    // Remove & replace currentRec with new one
    if (recs.length) {
      const recommendations = [...recs];
      setCurrentRec(recommendations.shift());
      setRecs(recommendations);
      localStorageParser.setItem(`unboringRecs-${title}`, recommendations);
    }
    // If last item in array -> load more recs into local storage
    else recsLoader();
  };

  return (() => {
    if (currentRec)
      window.localStorage.setItem(
        `unboringRecs-lastSeenId-${title}`,
        currentRec.id.toString()
      );
    return currentRec;
  })() ? (
    <Stack>
      <Flex>
        <Heading color="#276EF1" as="h1" size="4xl" isTruncated>
          {title}
        </Heading>
        <Spacer />
        <Flex>
          <Heading
            paddingRight={4}
            color="#276EF1"
            size="3xl"
            onClick={() => handleClick("increment_downvotes")}
          >
            <ThumbDownIcon color="#276EF1" />
          </Heading>
          <Spacer />
          <Heading
            paddingRight={4}
            color="#276EF1"
            size="3xl"
            onClick={() => handleClick()}
          >
            <RepeatIcon />
          </Heading>
        </Flex>
      </Flex>
      <Link
        style={{ textDecoration: "none" }}
        href={currentRec.url}
        onClick={() => handleClick("increment_clicks")}
        isExternal
      >
        <Box
          maxH="sm"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={currentRec.image_url} alt={currentRec.title} />

          <Box p="4">
            <Box
              mt="1"
              mb="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {currentRec.title}
            </Box>

            <Box>{currentRec.description}</Box>
          </Box>
        </Box>
      </Link>
    </Stack>
  ) : (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading color="#276EF1" as="h1" size="4xl" isTruncated>
        {title}
      </Heading>
      <Heading color="#276EF1" as="h1" size="2xl" mt={5}>
        CHECK BACK LATER
      </Heading>
    </Box>
  );
};

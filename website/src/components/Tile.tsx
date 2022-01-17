import { useEffect, useState } from "react";
import { Flex, Box, Image, Heading, Stack, Spacer } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Link } from "@opengovsg/design-system-react";
import { getRecommendations, supabaseClient } from "../../utils/supabase";
import { definitions } from "../../types/supabase";
import { ThumbDownIcon } from "./ThumbDownIcon";

export const Tile = ({ title }: { title: string }) => {
  const [recs, setRecs] = useState<definitions["recommendations"][]>([]);
  const [currentRec, setCurrentRec] = useState<
    definitions["recommendations"] | null
  >(null);
  // TODO: save recs to localstorage and only run query when recs in localstorage are empty.
  useEffect(() => {
    const runAsync = async () => {
      const recommendations = await getRecommendations(title.toLowerCase());
      console.log(recommendations);
      setCurrentRec(recommendations.pop());
      setRecs(recommendations);
    };
    runAsync();
  }, []);

  const handleLinkClick = async () => {
    // Increment clicks in DB
    const { error } = await supabaseClient.rpc("increment_clicks", {
      rec_id: currentRec.id,
    });
    if (error) console.log(error);
    // Remove & replace currentRec with new one
    // If last item in array -> load more recs into local storage
  };

  const handleDownVote = async () => {
    // Increment clicks in DB
    const { error } = await supabaseClient.rpc("increment_downvotes", {
      rec_id: currentRec.id,
    });
    if (error) console.log(error);
    // Remove & replace currentRec with new one
    // If last item in array -> load more recs into local storage
  };

  return currentRec ? (
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
            onClick={handleDownVote}
          >
            <ThumbDownIcon color="#276EF1" />
          </Heading>
          <Spacer />
          <Heading paddingRight={4} color="#276EF1" size="3xl">
            <RepeatIcon />
          </Heading>
        </Flex>
      </Flex>
      <Link
        style={{ textDecoration: "none" }}
        href={currentRec.url}
        onClick={handleLinkClick}
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
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"></Box>
  );
};

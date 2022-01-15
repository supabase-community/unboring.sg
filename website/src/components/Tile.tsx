import { useEffect, useState } from "react";
import { Box, Image, Heading, Stack } from "@chakra-ui/react";
import { getRecommendations } from "../../utils/supabase";
import { definitions } from "../../types/supabase";

export const Tile = ({ title }: { title: string }) => {
  const [recs, setRecs] = useState<definitions["recommendations"][]>([]);
  const [currentRec, setCurrentRec] = useState<
    definitions["recommendations"] | null
  >(null);
  useEffect(() => {
    const runAsync = async () => {
      const recommendations = await getRecommendations(title.toLowerCase());
      console.log(recommendations);
      setCurrentRec(recommendations.pop());
      setRecs(recommendations);
    };
    runAsync();
  }, []);

  return (
    currentRec && (
      <Stack>
        <Heading color="#276EF1" as="h1" size="4xl" isTruncated>
          {title}
        </Heading>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={currentRec.image_url} alt={currentRec.title} />

          <Box p="6">
            <Box
              mt="1"
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
      </Stack>
    )
  );
};

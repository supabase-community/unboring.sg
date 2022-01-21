import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  Text,
  Flex,
  Image,
  RadioGroup,
  HStack,
  Radio,
  Checkbox,
} from "@chakra-ui/react";
import { Link, Button } from "@opengovsg/design-system-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { definitions } from "../types/supabase";
import {
  getUnapprovedRecommendations,
  supabaseClient,
} from "../utils/supabase";

const Admin = () => {
  const router = useRouter();
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<definitions["recommendations"][]>([]);
  const [currentRec, setCurrentRec] = useState<
    definitions["recommendations"] | null
  >(null);

  // Load unapproved recommendations into state
  const loadRecs = async () => {
    const recs = await getUnapprovedRecommendations();
    setCurrentRec(recs.shift());
    setRecs(recs);
    if (!recs.length) setEmpty(true);
  };
  useEffect(() => {
    (async () => {
      if (supabaseClient.auth.user()) {
        loadRecs();
      } else {
        // Log in
        let password = prompt("Admin password:");
        if (password) {
          const { error } = await supabaseClient.auth.signIn({
            email: "admin@test.sg",
            password,
          });
          if (error) {
            alert(error.message);
            router.push("/");
          } else {
            loadRecs();
          }
        } else {
          router.push("/");
        }
      }
    })();
  }, []);

  // Handle saving
  const handleSaving = async () => {
    setLoading(true);
    const updatedRec = currentRec;
    console.log(updatedRec);
    const { data, error } = await supabaseClient
      .from<definitions["recommendations"]>("recommendations")
      .update(updatedRec)
      .eq("id", updatedRec.id);
    console.log(data, error);
    if (error) alert(error.message);
    setCurrentRec(null);
    setLoading(false);
    if (recs.length) {
      const recsClone = [...recs];
      setCurrentRec(recsClone.shift());
      setRecs(recsClone);
    } else {
      loadRecs();
    }
  };

  return (
    <SimpleGrid columns={2} spacing={5}>
      {/* Preview ifram pane */}
      {currentRec ? (
        <>
          <Box height="100vh" p={5}>
            <Link href={currentRec.url} isExternal>
              <Heading as="h1" size="sm" pb={2} isTruncated>
                {currentRec.title}
              </Heading>
            </Link>
            <iframe width="100%" height="95%" src={currentRec.url} />
          </Box>
          {/* Form edit pane */}

          <Box height="100vh">
            <Heading as="h2" size="sm" pb={2} isTruncated>
              Channel: {currentRec.channel}
            </Heading>
            {/* Title */}
            <FormControl isDisabled={loading}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={currentRec.title}
                onChange={(e) =>
                  setCurrentRec({ ...currentRec, title: e.target.value })
                }
              />
            </FormControl>
            {/* Description */}
            <FormControl isDisabled={loading}>
              <Text mb="8px">Description:</Text>
              <Textarea
                size="sm"
                value={currentRec.description}
                onChange={(e) =>
                  setCurrentRec({ ...currentRec, description: e.target.value })
                }
              />
            </FormControl>
            {/* Image URL */}
            <Text mb="8px">Image URL:</Text>
            <Flex>
              <Image
                maxW="250px"
                src={currentRec.image_url}
                alt={currentRec.title}
                fallbackSrc="https://via.placeholder.com/400x1"
              />
              <FormControl isDisabled={loading}>
                <Textarea
                  size="sm"
                  value={currentRec.image_url}
                  onChange={(e) =>
                    setCurrentRec({ ...currentRec, image_url: e.target.value })
                  }
                />
              </FormControl>
            </Flex>
            {/* Category */}
            <FormControl isDisabled={loading} as="fieldset">
              <FormLabel as="legend">Category</FormLabel>
              <RadioGroup
                defaultValue={currentRec.category}
                onChange={(value) =>
                  setCurrentRec({
                    ...currentRec,
                    category: value as "eat" | "do" | "learn",
                  })
                }
              >
                <HStack spacing="24px">
                  <Radio value="eat">EAT</Radio>
                  <Radio value="do">DO</Radio>
                  <Radio value="learn">LEARN</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            {/* Cost */}
            <FormControl isDisabled={loading} as="fieldset">
              <FormLabel as="legend">Cost</FormLabel>
              <RadioGroup
                defaultValue={currentRec.cost}
                onChange={(value) => {
                  if (!value) value = null;
                  setCurrentRec({
                    ...currentRec,
                    cost: value as "free" | "paid",
                  });
                }}
              >
                <HStack spacing="24px">
                  <Radio value="">NULL</Radio>
                  <Radio value="free">free</Radio>
                  <Radio value="paid">paid</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            {/* Approved */}
            <FormControl isDisabled={loading} as="fieldset">
              <Checkbox
                isChecked={currentRec.approved}
                onChange={(e) =>
                  setCurrentRec({
                    ...currentRec,
                    approved: e.target.checked,
                  })
                }
              >
                APPROVED
              </Checkbox>
            </FormControl>
            {/* Submit button */}
            <Button
              isLoading={loading}
              loadingText="Saving"
              colorScheme="primary"
              variant="outline"
              onClick={handleSaving}
            >
              Save
            </Button>
          </Box>
        </>
      ) : empty ? (
        <Heading as="h1">Review queue empty 🥳</Heading>
      ) : (
        "Loading..."
      )}
    </SimpleGrid>
  );
};

export default Admin;

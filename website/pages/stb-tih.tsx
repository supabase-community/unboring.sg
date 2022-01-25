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
  Spacer,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Link, Button } from "@opengovsg/design-system-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { definitions } from "../types/supabase";
import { supabaseClient } from "../utils/supabase";

const StbTih = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tihMeta, setTihMeta] = useState(null);
  const [dataset, setDataset] = useState("");
  const [keyword, setKeyword] = useState("");
  const [nextToken, setNextToken] = useState(null);
  const [data, setData] = useState(null);
  const [recs, setRecs] = useState([]);
  const [currentRec, setCurrentRec] = useState(null);

  // Login
  useEffect(() => {
    (async () => {
      if (supabaseClient.auth.user()) {
        loadDataSets();
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
            loadDataSets();
          }
        } else {
          router.push("/");
        }
      }
    })();
  }, []);

  //Load datasets
  const loadDataSets = async () => {
    const res = await fetch("/api/stb-tih").then((res) => res.json());
    setTihMeta(res);
  };

  // Load content from STB TIH
  const loadRecs = async (url: string) => {
    const data = await fetch(url).then((r) => r.json());
    if (data) {
      console.log(data);
      setData(data);
      const recs = data.data.results;
      setCurrentRec(recs.shift());
      setRecs(recs);
    }
  };

  useEffect(() => {
    let url = `/api/stb-tih?dataset=${dataset}`;
    if (keyword) url += `&keyword=${keyword}`;
    if (nextToken) url += `&nextToken=${nextToken}`;
    if (dataset) loadRecs(url);
  }, [dataset, keyword, nextToken]);

  const nextRec = () => {
    if (recs.length) {
      const recsClone = [...recs];
      setCurrentRec(recsClone.shift());
      setRecs(recsClone);
    } else {
      setNextToken(data.nextToken);
    }
  };

  useEffect(() => {
    if (
      currentRec?.officialWebsite &&
      !currentRec.officialWebsite.includes("http")
    ) {
      setCurrentRec({
        ...currentRec,
        officialWebsite: `https://${currentRec.officialWebsite}`,
      });
    }
  }, [currentRec]);

  // Handle saving
  const handleSaving = async () => {
    setLoading(true);
    if (!currentRec.officialWebsite) {
      alert("No website found, skipping.");
      setCurrentRec(null);
      setLoading(false);
      return nextRec();
    }
    const { row, error } = await fetch(
      `/api/metascraper?url=${currentRec.officialWebsite}&category=${currentRec.category}&title=${currentRec.name}&description=${currentRec.description}&cost=${currentRec.cost}&channel=stb_tih&doNotSave=true`
    ).then((r) => r.json());
    if (error) return alert(error.message);
    row.approved = true;
    console.log(row);
    const { data, error: supaError } = await supabaseClient
      .from<definitions["recommendations"]>("recommendations")
      .insert(row);
    if (supaError) alert(supaError.message);
    console.log(data);
    setCurrentRec(null);
    setLoading(false);
    nextRec();
  };

  const DataSetSwitch = () => (
    <Stack direction="row" spacing={4} align="center">
      <Select
        placeholder="Select dataset"
        variant="filled"
        onChange={(e) => setDataset(e.target.value)}
        value={dataset}
      >
        {tihMeta.datasets.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </Select>
      {dataset && tihMeta.keywords[dataset] && (
        <Select
          placeholder="Select keyword"
          variant="filled"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        >
          {tihMeta.keywords[dataset].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      )}
    </Stack>
  );

  return (
    <SimpleGrid columns={2}>
      {/* Preview ifram pane */}
      {currentRec ? (
        <>
          <Box height="100vh" p={5}>
            <DataSetSwitch />
            <Link href={currentRec.officialWebsite} isExternal>
              <Heading as="h1" size="sm" pb={2} isTruncated>
                {currentRec.name}
              </Heading>
            </Link>
            <iframe
              width="100%"
              height="95%"
              src={currentRec.officialWebsite}
            />
          </Box>
          {/* Form edit pane */}

          <Box height="100vh" p={5}>
            <Heading as="h2" size="sm" pb={2} isTruncated>
              Channel: {currentRec.source}
            </Heading>
            {/* Title */}
            <FormControl isDisabled={loading}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={currentRec.name}
                onChange={(e) =>
                  setCurrentRec({ ...currentRec, name: e.target.value })
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
            <Flex position="absolute" width="250px" bottom={5}>
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
              <Spacer />
              {/* Skip button */}
              <Button
                isLoading={loading}
                colorScheme="primary"
                variant="outline"
                onClick={nextRec}
              >
                Skip
              </Button>
            </Flex>
          </Box>
        </>
      ) : tihMeta?.datasets ? (
        <DataSetSwitch />
      ) : (
        "Loading..."
      )}
    </SimpleGrid>
  );
};

export default StbTih;

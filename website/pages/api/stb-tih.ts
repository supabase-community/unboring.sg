import { NextApiRequest, NextApiResponse } from "next";

const datasets = [
  "accommodation",
  "attractions",
  "bars_clubs",
  "cruises",
  "event",
  "food_beverages",
  "precincts",
  "shops",
  "tour",
  "venue",
  "walking_trail",
];

const keywords = {
  attractions: [
    "Adventure",
    "Arts",
    "History & Culture",
    "Leisure & Recreation",
    "Nature & Wildlife",
    "Others",
  ],
};

const generateUrl = ({
  dataset,
  keyword,
  nextToken,
}: {
  dataset: string;
  keyword: string;
  nextToken?: string;
}) => {
  let url = `https://tih-api.stb.gov.sg/content/v1/search/all?dataset=${dataset}&language=en&apikey=${process.env.NEXT_PUBLIC_STB_TIH_API_KEY}`;
  if (keyword) url += `&keyword=${keyword}`;
  if (nextToken) url += `&nextToken=${nextToken}`;
  return url;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dataset, keyword, nextToken } = req.query;

  if (
    !datasets.includes(dataset as string) ||
    (keyword && !keywords[dataset as string].includes[keyword as string])
  ) {
    return res.json({
      error: "Either dataset or keyword not allowed!",
      datasets,
      keywords,
    });
  }

  const { data, nextToken: newNextToken } = await fetch(
    generateUrl({
      dataset: dataset as string,
      keyword: keyword as string,
      nextToken: nextToken as string,
    })
  ).then((res) => res.json());
  res.json({ nextToken: newNextToken, data });
};

export default handler;

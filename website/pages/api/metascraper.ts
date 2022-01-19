import { NextApiRequest, NextApiResponse } from "next";

const metascraper = require("metascraper")([require("metascraper-image")()]);
const got = require("got");

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query.url);
  const { body: html, url } = await got(req.query.url);
  const metadata = await metascraper({ html, url });
  console.log(metadata);
  res.json({ metadata });
};

export default webhookHandler;

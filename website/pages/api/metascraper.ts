import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { definitions } from "../../types/supabase";

const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
]);
const got = require("got");

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const categories = ["eat", "do", "learn"];
const cost_types = ["free", "paid"];

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    url: qUrl,
    channel,
    category,
    description,
    title,
    cost,
    doNotSave,
  } = req.query;

  const { body: html, url } = await got(qUrl);
  const metadata = await metascraper({ html, url });
  console.log(metadata);

  // Write to Supabase
  const row: any = {
    title: title ?? metadata.title,
    description: description ?? metadata.description,
    url: qUrl as string,
    image_url:
      metadata.image ?? metadata.logo ?? "https://via.placeholder.com/400x1",
    source: metadata.publisher,
    metadata,
  };
  if (channel) row.channel = channel as string;
  if (categories.includes(category as string)) {
    row.category = category as string;
  }
  if (cost_types.includes(cost as string)) {
    row.cost = cost as string;
  }

  if (doNotSave) {
    return res.json({ metadata, row });
  }

  const { error } = await supabaseAdmin
    .from<definitions["recommendations"]>("recommendations")
    .insert([row]);
  if (error) {
    console.log("DB error", error);
    res.json({ error });
  } else {
    res.json({ metadata });
  }
};

export default webhookHandler;

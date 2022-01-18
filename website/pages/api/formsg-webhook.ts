import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { definitions } from "../../types/supabase";
const formsg = require("@opengovsg/formsg-sdk")({
  mode: "production",
});

const metascraper = require("metascraper")([require("metascraper-image")()]);
const got = require("got");

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Endpoint authentication by verifying signatures
      formsg.webhooks.authenticate(
        req.headers["x-formsg-signature"],
        process.env.FORMSG_WEBHOOK_POST_URI
      );
      // Continue processing the POST body
      // If `verifiedContent` is provided in `req.body.data`, the return object
      // will include a verified key.
      const submission = process.env.FORMSG_HAS_ATTACHMENTS
        ? await formsg.crypto.decryptWithAttachments(
            process.env.FORMSG_SECRET_KEY,
            req.body.data
          )
        : formsg.crypto.decrypt(process.env.FORMSG_SECRET_KEY, req.body.data);

      // If the decryption failed, submission will be `null`.
      if (submission) {
        // Continue processing the submission
        const res = submission.content.responses;
        const submittedUrl = res.find((i) => i.question === "URL").answer;

        // Try to scrape og:image
        const { body: html, url } = await got(submittedUrl);
        const metadata = await metascraper({ html, url });
        console.log({ metadata });

        // Write record to Supabase database.
        const { error } = await supabaseAdmin
          .from<definitions["recommendations"]>("recommendations")
          .insert([
            {
              title: res.find((i) => i.question === "Title").answer,
              description: res.find((i) => i.question === "Description").answer,
              url: submittedUrl,
              image_url: metadata?.image ?? "https://via.placeholder.com/400x1",
              category: res
                .find((i) => i.question === "Category")
                .answer.split(" ")[0]
                .toLowerCase(),
              channel: "formsg",
            },
          ]);
        if (error) {
          console.log("DB error", error);
          throw error;
        }
      } else {
        // Could not decrypt the submission
        console.log("Could not decrypt the submission");
      }
    } catch (e) {
      console.log("Unauthorized");
      return res.status(401).end("Unauthorized");
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;

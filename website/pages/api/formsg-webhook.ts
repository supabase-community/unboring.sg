import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { definitions } from "../../types/supabase";
const formsg = require("@opengovsg/formsg-sdk")({
  mode: "production",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      console.log("req.headers", JSON.stringify(req.headers, null, 2));
      console.log("req.rawHeaders", JSON.stringify(req.rawHeaders, null, 2));
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
        console.log("submission", JSON.stringify(submission, null, 2));
        // Insert record into Supabase
        const res = submission.content.responses;
        const { error } = await supabaseAdmin
          .from<definitions["recommendations"]>("recommendations")
          .insert([
            {
              title: res.find((i) => i.question === "Title").answer,
              description: res.find((i) => i.question === "Description").answer,
              url: res.find((i) => i.question === "URL").answer,
              image_url: "https://via.placeholder.com/400x300", // TODO extract og:image
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

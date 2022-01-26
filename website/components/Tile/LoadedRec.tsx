import { Link } from "@opengovsg/design-system-react";
import { definitions } from "../../types/supabase";
import { RecText } from "./RecText";

interface LoadedRecProps {
  rec: definitions["recommendations"];
  handleClick: (
    event?: "increment_clicks" | "increment_downvotes"
  ) => Promise<void>;
}

export const LoadedRec = ({ rec, handleClick }: LoadedRecProps) => {
  return (
    <Link
      h="100%"
      backgroundImage={rec.image_url}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      alignSelf="flex-end"
      style={{ textDecoration: "none" }}
      href={rec.url}
      onClick={() => handleClick("increment_clicks")}
      target="_blank"
    >
      <RecText rec={rec} />
    </Link>
  );
};

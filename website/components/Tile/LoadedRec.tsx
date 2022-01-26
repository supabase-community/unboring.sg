import { Link } from "@opengovsg/design-system-react";
import { RecText } from "./RecText";

export const LoadedRec = (props) => {
  const { rec, handleClick } = props;
  return (
    <Link
      {...props}
      h="100%"
      backgroundImage={rec.image_url}
      backgroundSize="contain"
      backgroundRepeat="repeat-x"
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

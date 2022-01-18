import { useEffect } from "react";
import { useRouter } from "next/router";

const ResetLocalStorage = () => {
  const categories = ["EAT", "DO", "LEARN"];
  const router = useRouter();

  useEffect(() => {
    categories.map((category) => {
      window.localStorage.removeItem(`unboringRecs-${category}`);
      window.localStorage.removeItem(`unboringRecs-lastSeenId-${category}`);
    });
    router.push("/");
  }, []);

  return <p>Resetting and redirecting...</p>;
};

export default ResetLocalStorage;

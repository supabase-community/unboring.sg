import { createClient } from "@supabase/supabase-js";
import { definitions } from "../types/supabase";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const getRecommendations = async (
  category: string,
  lastSeenId?: number
): Promise<definitions["recommendations"][]> => {
  const { data, error } = await supabaseClient
    .from<definitions["recommendations"]>("recommendations")
    .select("*")
    .eq("approved", true)
    .eq("category", category)
    .gt("id", lastSeenId || 0)
    .or(
      `expiration_date.is.null,expiration_date.gt.${new Date().toISOString()}`
    )
    .limit(10)
    .order("id", { ascending: true });
  // TODO: filter by created in last 7 days?

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const getUnapprovedRecommendations = async (): Promise<
  definitions["recommendations"][]
> => {
  const { data, error } = await supabaseClient
    .from<definitions["recommendations"]>("recommendations")
    .select("*")
    .eq("approved", false)
    .limit(10)
    .order("id", { ascending: true });

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const localStorageParser = {
  setItem: (key: string, data: definitions["recommendations"][]): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  getItem: (key: string): definitions["recommendations"][] => {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  },
};

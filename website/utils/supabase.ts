import { createClient } from "@supabase/supabase-js";
import { definitions } from "../types/supabase";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const getRecommendations = async (
  category: string
): Promise<definitions["recommendations"][]> => {
  const { data, error } = await supabaseClient
    .from<definitions["recommendations"]>("recommendations")
    .select("*")
    .eq("approved", true)
    .eq("category", category)
    .or(
      `expiration_date.is.null,expiration_date.gt.${new Date().toISOString()}`
    );

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

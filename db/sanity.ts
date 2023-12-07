import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  apiVersion: "2023-12-06",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

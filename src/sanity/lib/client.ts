import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // false para ISR funcionar corretamente
  stega: {
    enabled: false,
  },
});

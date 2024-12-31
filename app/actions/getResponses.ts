"use server";

import { responses } from "@/app/data/responses";

// This function returns a stringified version of the responses
export default async function getResponses() {
  return JSON.stringify(responses);
}

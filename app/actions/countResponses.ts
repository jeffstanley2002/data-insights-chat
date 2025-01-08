"use server";

import { responses } from "@/app/data/responses";

export default async function countResponses() {
  return { count: responses.length };
}

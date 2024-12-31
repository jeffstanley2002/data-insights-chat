import countResponses from "@/app/actions/countResponses";
import getResponses from "@/app/actions/getResponses";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: "You are a helpful assistant.",
    messages,
    tools: {
      count: tool({
        description: "Get the total count of responses",
        parameters: z.object({
          count: z.number().describe("The total count of responses"),
        }),
        execute: countResponses,
      }),
      getResponses: tool({
        description: "Get the list of responses",
        parameters: z.object({
          question: z.string().describe("The target question"),
        }),
        execute: getResponses,
      }),
    },
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}

import countResponses from "@/app/actions/countResponses";
import getResponses from "@/app/actions/getResponses";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Basic validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid message format' }),
        { status: 400 }
      );
    }

    const result = streamText({
      model: google("gemini-1.5-pro"),
      system: `You are a data analyst assistant specializing in analyzing student survey data.

Instructions for data analysis:
1. Always use the 'count' tool to get total responses first
2. Use 'getResponses' to fetch the relevant data
3. When analyzing data:
   - Calculate and show percentages for each category
   - Sort findings by frequency/importance
   - Present data in a clear, structured format
   - Use bullet points for better readability
   - Include specific numbers AND percentages
   - Compare different categories when relevant

Format your responses like this:
"Based on {total} survey responses:

Main findings (sorted by frequency):
• {finding 1}: {X students} ({X%})
• {finding 2}: {X students} ({X%})
...

Additional insights:
• {comparative analysis}
• {relevant patterns}
• {notable correlations}"

Always maintain professional tone and provide comprehensive analysis.`,
      messages,
      tools: {
        count: tool({
          description: "Get total number of survey responses",
          parameters: z.object({
            count: z.number().describe("Total number of responses"),
          }),
          execute: countResponses,
        }),
        getResponses: tool({
          description: "Get all survey responses",
          parameters: z.object({
            responses: z.string().describe("JSON string of survey responses"),
          }),
          execute: getResponses,
        }),
      },
      temperature: 0.3,
      maxSteps: 4,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}

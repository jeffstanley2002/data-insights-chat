"use server";

import { responses } from "@/app/data/responses";
import { z } from "zod";

// Define response schema
const ResponseSchema = z.object({
  stress_source: z.string(),
  overwhelmed_frequency: z.string(),
  stress_management: z.string(),
  mental_health_rating: z.number(),
  desired_support: z.string(),
});

export default async function getResponses() {
  try {
    const surveyData = responses.map(response => {
      const data = {
        stress_source: response["What are the main sources of academic stress you experience as a university student?"],
        overwhelmed_frequency: response["How often do you feel overwhelmed by your academic workload?"],
        stress_management: response["Which of the following strategies do you use to manage academic stress? (Select all that apply)"],
        mental_health_rating: response["On a scale from 1 to 10, how would you rate your overall mental health during the academic year?"],
        desired_support: response["What support services do you think would help improve your academic experience and mental health?"]
      };

      // Validate data
      return ResponseSchema.parse(data);
    });

    return JSON.stringify(surveyData);
  } catch (error) {
    console.error('Data Processing Error:', error);
    throw new Error('Failed to process survey data');
  }
}

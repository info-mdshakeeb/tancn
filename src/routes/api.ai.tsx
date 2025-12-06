import { createFileRoute } from '@tanstack/react-router'
import { gemini } from "@tanstack/ai-gemini";
import { chat, toStreamResponse } from "@tanstack/ai";


const SYSTEM_PROMPT = `You are an expert form generator AI.
Your goal is to generate a valid JSON configuration for a form based on the user's description.

The output must be a JSON object with the following structure:
{
  "fields": (Field | Field[])[]
}

Where 'Field' matches this TypeScript interface:

type FieldType = "text" | "email" | "number" | "password" | "textarea" | "checkbox" | "radio" | "select" | "date" | "otp" | "switch" | "slider" | "file";

interface Field {
  id: string; // Unique ID
  type: FieldType;
  label: string;
  name: string; // camelCase
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number; // for number/date
    max?: number; // for number/date
  };
  appearance?: {
    placeholder?: string;
    helpText?: string;
    width?: "auto" | "full" | "1/2" | "1/3";
  };
  options?: { id: string; label: string; value: string }[]; // For 'radio' and 'select'
}

Rules:
1. The "fields" array can contain 'Field' objects or arrays of 'Field' objects.
2. If an item in "fields" is an array, it represents a row of fields (e.g., First Name and Last Name on the same row).
3. If an item is a single 'Field' object, it takes up the full width (or its specified width) on a new line.
4. Use 'id's that are unique across the form.
5. Generate meaningful labels and placeholders.
6. STRICTLY return ONLY the JSON object. No markdown code blocks, no explanations.
7. For 'radio' and 'select', you MUST provide the 'options' array.

Example Output:
{
  "fields": [
    [
      { "id": "fname", "type": "text", "label": "First Name", "name": "firstName", "appearance": { "width": "1/2" } },
      { "id": "lname", "type": "text", "label": "Last Name", "name": "lastName", "appearance": { "width": "1/2" } }
    ],
    { "id": "email", "type": "email", "label": "Email Address", "name": "email", "validation": { "required": true } }
  ]
}
`


export const Route = createFileRoute('/api/ai')({
  server : {
    handlers : {
      POST : async ({request , context}) => {
        if (!process.env.OPENAI_API_KEY) {
          return new Response(
            JSON.stringify({
              error: "Gemini API not configured",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const abortController = new AbortController()

        const { messages, conversationId } = await request.json() as { messages: any[], conversationId: string };

        try {
          // Create a streaming chat response
          const stream = chat({
            adapter: gemini(),
            messages,
            model: "gemini-2.0-flash",
            conversationId,
            options : {
            },
            abortController : abortController,
            systemPrompts : [SYSTEM_PROMPT],
          });

          // Convert stream to HTTP response
          return toStreamResponse(stream);
        } catch (error: any) {
          return new Response(
            JSON.stringify({
              error: error.message || "An error occurred",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }
  }
})
import { createClient } from '@supabase/supabase-js';
import { pipeline, env } from '@xenova/transformers';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Disable local model caching for serverless environments (like Vercel)
env.allowLocalModels = false;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Setup Groq API using the OpenAI SDK adapter
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// Cache the embedding pipeline globally so we don't reload it every request
let extractor: any = null;

// Helper: extract plain text from a UIMessage (which uses `parts` array)
// or from a legacy message (which uses `content` string).
function getMessageText(msg: any): string {
  // New UIMessage format: parts is an array of { type: 'text', text: '...' }
  if (Array.isArray(msg.parts)) {
    return msg.parts
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('');
  }
  // Legacy format: content is a string
  if (typeof msg.content === 'string') {
    return msg.content;
  }
  return '';
}

// Helper: convert UIMessages from the frontend into simple ModelMessages
// that the AI SDK streamText function expects.
function toModelMessages(messages: any[]): Array<{ role: string; content: string }> {
  return messages
    .filter((m: any) => m.role === 'user' || m.role === 'assistant')
    .map((m: any) => ({
      role: m.role,
      content: getMessageText(m),
    }));
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Convert UIMessages to simple model messages
    const modelMessages = toModelMessages(messages);
    const lastUserMessage = modelMessages.filter(m => m.role === 'user').pop();
    
    if (!lastUserMessage || !lastUserMessage.content) {
      return new Response(JSON.stringify({ error: 'No user message found' }), { status: 400 });
    }

    // 1. Generate embedding for the user's message
    if (!extractor) {
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    const output = await extractor(lastUserMessage.content, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);

    // 2. Query Supabase for relevant website content
    const { data: documents, error } = await supabase.rpc('match_website_content', {
      query_embedding: embedding,
      match_threshold: 0.2, // Low threshold to cast a wide net
      match_count: 5, // Top 5 most relevant chunks
    });

    if (error) {
      console.error("Supabase search error:", error);
      throw new Error("Failed to search knowledge base");
    }

    // 3. Construct the RAG context string
    const contextStr = documents?.map((doc: any) => doc.content).join('\n\n') || "No specific website content found.";

    // 4. Build the strict System Prompt
    const systemPrompt = `
You are a helpful, enthusiastic, and professional customer support assistant for NutraGrow, a premium hair growth supplement.
Your goal is to answer customer questions accurately based ONLY on the provided Context from our website.

CRITICAL MEDICAL DISCLAIMER:
You are NOT a medical professional. Under NO circumstances should you provide medical advice, diagnose, or recommend treatments for medical conditions (like specific types of alopecia, diseases, or severe hair loss conditions). 
If the user asks a medical question, you MUST politely refuse to answer medically and strictly advise them to consult a doctor or healthcare professional before taking any supplements.

Context from the NutraGrow website:
"""
${contextStr}
"""

Instructions:
- If the answer is in the Context, answer clearly and concisely.
- If the answer is NOT in the Context, do not guess or hallucinate. Politely state that you don't have that specific information and offer to connect them with support at support@nutragrow.com.
- Maintain a friendly, premium brand tone.
- Never mention that you are reading from "Context" or a database. Just answer naturally as the support agent.
`;

    // 5. Call Groq LLM with simple model messages
    const result = streamText({
      model: groq('openai/gpt-oss-20b'),
      system: systemPrompt,
      messages: modelMessages as any,
      temperature: 0.3,
    });

    // 6. Stream the response back using the UIMessage stream format
    // (required by @ai-sdk/react useChat hook in v4+)
    return result.toUIMessageStreamResponse();
    
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

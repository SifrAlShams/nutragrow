import { createClient } from '@supabase/supabase-js';
import { pipeline } from '@xenova/transformers';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Define the website knowledge base manually for high quality, clean RAG data
const knowledgeBase = [
  {
    url_source: "/",
    content: "NutraGrow is a premium hair growth supplement designed to combat thinning hair and promote thicker, fuller hair for both men and women. The formula is 100% natural, vegetarian, and manufactured in an FDA-registered facility."
  },
  {
    url_source: "/#ingredients",
    content: "Key Ingredients in NutraGrow include: Biotin (promotes keratin production), Saw Palmetto (blocks DHT, a hormone linked to hair loss), Ashwagandha (reduces stress-related hair loss), and Marine Collagen (strengthens hair follicles and improves skin hydration)."
  },
  {
    url_source: "/#usage",
    content: "How to use NutraGrow: Take two (2) capsules daily with a meal and an 8oz glass of water. For best results, consistent daily use for at least 3 to 6 months is recommended."
  },
  {
    url_source: "/#pricing",
    content: "NutraGrow Pricing: 1 Bottle (1 Month Supply) is $49. 3 Bottles (3 Month Supply) is $129 ($43/bottle). 6 Bottles (6 Month Supply) is $229 ($38/bottle). All multi-bottle packages include free shipping."
  },
  {
    url_source: "/refund-policy",
    content: "Refund Policy: We offer a 60-day money-back guarantee. If you are not satisfied with your results after 60 days of consistent use, you can return the empty bottles for a full refund (minus shipping costs). Contact support@nutragrow.com to initiate a return."
  },
  {
    url_source: "/shipping-policy",
    content: "Shipping Policy: Orders are processed within 24 hours. Standard shipping takes 3-5 business days within the US. International shipping is available and takes 7-14 business days. Free shipping is included on all 3-bottle and 6-bottle orders."
  },
  {
    url_source: "/faq",
    content: "FAQ: Does NutraGrow have any side effects? NutraGrow is formulated with natural ingredients and is generally safe. However, as with any supplement, please consult your physician before use, especially if you have a medical condition or are pregnant/nursing."
  }
];

async function main() {
  console.log("Loading embedding model (this may take a moment on first run)...");
  // all-MiniLM-L6-v2 is a lightweight, fast, and completely free embedding model that runs locally
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  
  console.log("Model loaded. Ingesting knowledge base...");

  for (const doc of knowledgeBase) {
    // Generate the embedding vector
    const output = await extractor(doc.content, { pooling: 'mean', normalize: true });
    // @ts-ignore - output.data is a Float32Array, we convert it to a standard JS array for Supabase
    const embedding = Array.from(output.data);

    // Insert into Supabase
    const { error } = await supabase
      .from('website_content')
      .insert({
        content: doc.content,
        url_source: doc.url_source,
        embedding: embedding,
      });

    if (error) {
      console.error(`Error inserting document ${doc.url_source}:`, error.message);
    } else {
      console.log(`Successfully ingested: ${doc.url_source}`);
    }
  }

  console.log("Knowledge base ingestion complete!");
}

main().catch(console.error);

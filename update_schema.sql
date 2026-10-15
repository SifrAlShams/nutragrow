-- 1. Add Shipping Info to Orders Table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS customer_name TEXT,
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS shipping_city TEXT,
ADD COLUMN IF NOT EXISTS shipping_state TEXT,
ADD COLUMN IF NOT EXISTS shipping_zip TEXT,
ADD COLUMN IF NOT EXISTS shipping_country TEXT;

-- 2. Add Complex Data Columns to Products Table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS capsules INTEGER DEFAULT 60,
ADD COLUMN IF NOT EXISTS ingredients JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS usage JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb;

-- 3. Update the existing product with the full data from the codebase
UPDATE products
SET 
    capsules = 60,
    ingredients = '[
        {"name": "Vitamin A (as Beta-Carotene)", "amount": "900mcg"},
        {"name": "Vitamin C (Ascorbic Acid)", "amount": "90mg"},
        {"name": "Vitamin D3 (Cholecalciferol)", "amount": "20mcg"},
        {"name": "Vitamin E (D-Alpha Tocopheryl)", "amount": "15mg"},
        {"name": "Folate", "amount": "400mcg DFE"},
        {"name": "Biotin", "amount": "2500mcg"},
        {"name": "Zinc (Zinc Oxide)", "amount": "11mg"},
        {"name": "Hydrolyzed Collagen Peptides", "amount": "500mg"},
        {"name": "Ashwagandha Extract", "amount": "200mg"},
        {"name": "Saw Palmetto Extract", "amount": "150mg"}
    ]'::jsonb,
    benefits = '[
        "Promotes thicker, fuller hair growth",
        "Supports skin hydration and elasticity",
        "Helps reduce fine lines and wrinkles",
        "Strengthens nails and prevents breakage",
        "Provides essential antioxidants for overall wellness"
    ]'::jsonb,
    usage = '[
        "Take two (2) capsules daily",
        "For best results, take with a meal and 8oz of water",
        "Store in a cool, dry place away from direct sunlight"
    ]'::jsonb,
    certifications = '["Non-GMO", "Gluten Free", "Made in USA", "GMP Certified"]'::jsonb
WHERE id = '1';

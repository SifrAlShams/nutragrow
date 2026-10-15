-- Create products table
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT,
    capsules INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create discount_codes table
CREATE TABLE discount_codes (
    code TEXT PRIMARY KEY,
    discount_percentage INTEGER NOT NULL,
    is_used BOOLEAN DEFAULT false NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    order_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_code_used TEXT REFERENCES discount_codes(code),
    status TEXT DEFAULT 'pending' NOT NULL,
    stripe_session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial product
INSERT INTO products (id, name, description, price, image, capsules)
VALUES (
    '1', 
    'Hair & Skin Support', 
    'Formulated to support healthy hair and scalp health, radiant skin, and overall beauty wellness in women', 
    29.99, 
    '/images/studio_image1.jpeg', 
    60
);

-- Row Level Security (RLS) policies
-- We want anyone to be able to read products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);

-- We want anyone to be able to read if a discount code is valid (but not see all codes)
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to specific discount code" ON discount_codes FOR SELECT USING (true);
-- Updating the discount code (marking as used) should only be done via secure server API (Service Role Key), so no public UPDATE policy needed.

-- Orders should only be inserted by our secure server API, so no public INSERT policy needed.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

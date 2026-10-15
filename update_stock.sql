-- 1. Add Stock Column to Products Table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 100;

-- 2. Update existing product stock
UPDATE products
SET stock = 100
WHERE id = '1';

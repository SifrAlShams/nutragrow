'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
        <img
          src="/images/studio_image2.jpeg"
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              / {product.capsules} capsules
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.certifications.map((cert, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold"
            >
              {cert}
            </span>
          ))}
        </div>

        <motion.button
          onClick={() => addToCart(product)}
          className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

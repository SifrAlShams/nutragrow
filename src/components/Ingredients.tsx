'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { FlaskConical, Leaf } from 'lucide-react';

interface IngredientsProps {
  product: Product;
}

export default function Ingredients({ product }: IngredientsProps) {
  return (
    <section id="ingredients" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FlaskConical className="text-primary-600" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Premium Ingredients
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully selected for maximum effectiveness and your well-being
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {ingredient.name}
                  </h3>
                  <p className="text-primary-600 font-semibold">
                    {ingredient.amount}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

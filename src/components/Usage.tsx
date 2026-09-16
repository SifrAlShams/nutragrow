'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Clock, AlertCircle } from 'lucide-react';

interface UsageProps {
  product: Product;
}

export default function Usage({ product }: UsageProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-accent-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="text-accent-600" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              How to Use
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple daily routine for best results
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {product.usage.map((instruction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-accent-700">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-lg">{instruction}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4"
          >
            <AlertCircle className="text-amber-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Important Note</h3>
              <p className="text-amber-700">
                These statements have not been evaluated by the Food and Drug Administration. 
                This product is not intended to diagnose, treat, cure, or prevent any disease. 
                Consult your healthcare provider before use.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

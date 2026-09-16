'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Check, Package, Droplets, Heart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
}

const studioImages = [
  '/images/studio_image1.jpeg',
  '/images/studio_image2.jpeg',
  '/images/studio_image3.jpeg',
  '/images/studio_image4.jpeg',
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    for (let i = 0; i < selectedQuantity; i++) {
      addToCart(product);
    }
  };

  return (
    <section id="product" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                key={selectedImage}
                src={studioImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-3 mt-4 justify-center">
              {studioImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary-600 scale-105'
                      : 'border-transparent hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-accent-300 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart className="text-white" size={32} />
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Premium Supplement
            </motion.span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-500 text-lg">
                / {product.capsules} capsules
              </span>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.certifications.map((cert, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Check size={16} />
                  {cert}
                </motion.span>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-gray-900">Quantity:</span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <span className="w-12 text-center text-xl font-bold">
                  {selectedQuantity}
                </span>
                <motion.button
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart - ${(product.price * selectedQuantity).toFixed(2)}
            </motion.button>

            {/* Benefits Preview */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Package className="text-primary-600" size={24} />
                <span className="text-sm font-medium text-gray-700">
                  {product.capsules} Capsules
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Droplets className="text-primary-600" size={24} />
                <span className="text-sm font-medium text-gray-700">
                  Natural Formula
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Heart className="text-primary-600" size={24} />
                <span className="text-sm font-medium text-gray-700">
                  Women&apos;s Health
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

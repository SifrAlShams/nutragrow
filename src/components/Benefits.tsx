'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Shield, Sun, Flower } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Healthy Hair Growth',
    description: 'Supports thicker, stronger hair with essential vitamins and minerals',
  },
  {
    icon: Sun,
    title: 'Radiant Skin',
    description: 'Promotes glowing, healthy skin from within with powerful antioxidants',
  },
  {
    icon: Shield,
    title: 'Natural Ingredients',
    description: 'Made with premium, natural ingredients for your peace of mind',
  },
  {
    icon: Flower,
    title: 'Overall Wellness',
    description: 'Enhances your beauty wellness routine with comprehensive support',
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="benefits" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-primary-600">Nutra Grow</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the transformative power of nature-backed science for your hair and skin
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

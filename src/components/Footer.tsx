'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <img
                src="/images/fbd919a7-6db3-4d29-b469-7798f845eeb4-removebg-preview.png"
                alt="Nutra Grow Logo"
                className="h-32 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Premium hair and skin support supplements designed for women who want to radiate health and confidence.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Building2 size={20} className="text-primary-400" />
                <span>Parsa and Parsa LLC</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-primary-400" />
                <span>Newark, DE 19713</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-primary-400" />
                <a href="mailto:Nutragrowsupplements@gmail.com" className="hover:text-primary-400 transition-colors">
                  Nutragrowsupplements@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#product" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Product
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-6">Certifications</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GMP</span>
                </div>
                <span className="text-gray-300">GMP Certified</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">USA</span>
                </div>
                <span className="text-gray-300">Made in USA</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NG</span>
                </div>
                <span className="text-gray-300">Non-GMO</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Nutra Grow. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

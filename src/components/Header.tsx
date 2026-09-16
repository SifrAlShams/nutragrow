'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/images/fbd919a7-6db3-4d29-b469-7798f845eeb4-removebg-preview.png"
                alt="Nutra Grow Logo"
                className="h-28 w-auto object-contain"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <motion.a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.a>
              <motion.a
                href="#product"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Product
              </motion.a>
              <motion.a
                href="#benefits"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Benefits
              </motion.a>
              <motion.a
                href="#contact"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.a>
            </nav>

            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="text-gray-700" size={24} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Home
                </a>
                <a href="#product" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Product
                </a>
                <a href="#benefits" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Benefits
                </a>
                <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  Contact
                </a>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

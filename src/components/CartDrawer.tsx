'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src="/images/studio_image3.jpeg"
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-primary-600 font-bold mb-2">
                          ${item.product.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </motion.button>

                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <motion.button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </motion.button>

                          <motion.button
                            onClick={() => removeFromCart(item.product.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={() => {
                    onClose();
                    router.push('/checkout');
                  }}
                  className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

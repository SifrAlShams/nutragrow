'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah M.",
    role: "Verified Buyer",
    content: "I've been using Nutra Grow for 3 months now, and the difference in my hair thickness is incredible. My nails are also much stronger! Highly recommend.",
    rating: 5,
    initials: "SM",
    bgColor: "bg-pink-100",
    textColor: "text-pink-700"
  },
  {
    name: "Emily R.",
    role: "Verified Buyer",
    content: "Finally a supplement that doesn't upset my stomach. My skin has this natural glow now that I haven't seen in years. Will definitely keep purchasing.",
    rating: 5,
    initials: "ER",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700"
  },
  {
    name: "Jessica T.",
    role: "Verified Buyer",
    content: "The ingredient list is what sold me. It's so hard to find a hair and skin vitamin without all the extra junk. Love the results so far!",
    rating: 5,
    initials: "JT",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700"
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Women Everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-8 right-8 text-gray-100" size={48} />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                ))}
              </div>
              
              <p className="text-gray-700 mb-8 relative z-10 italic">
                "{review.content}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 ${review.bgColor} ${review.textColor} rounded-full flex items-center justify-center font-bold text-lg`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

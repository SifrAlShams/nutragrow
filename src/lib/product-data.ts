import { Product } from '@/types';

export const product: Product = {
  id: '1',
  name: 'Hair & Skin Support',
  description: 'Formulated to support healthy hair and scalp health, radiant skin, and overall beauty wellness in women',
  price: 29.99,
  image: '/images/studio_image1.jpeg',
  capsules: 60,
  ingredients: [
    { name: 'Vitamin A', amount: '2500 IU' },
    { name: 'Vitamin C', amount: '60 mg' },
    { name: 'Vitamin D3', amount: '25 mcg' },
    { name: 'Vitamin E', amount: '15 mg' },
    { name: 'Folate', amount: '400 mcg' },
    { name: 'Biotin', amount: '5000 mcg' },
    { name: 'Zinc', amount: '15 mg' },
    { name: 'Collagen', amount: '100 mg' },
    { name: 'Ashwagandha', amount: '300 mg' },
    { name: 'Saw Palmetto', amount: '320 mg' },
  ],
  benefits: [
    'Supports healthy hair growth and thickness',
    'Promotes radiant, glowing skin',
    'Strengthens nails',
    'Supports scalp health',
    'Enhances overall beauty wellness',
    'Made with natural ingredients',
  ],
  usage: [
    'Take 2 capsules daily with food',
    'For best results, take consistently',
    'Consult your healthcare provider before use',
    'Store in a cool, dry place',
  ],
  certifications: ['GMP Certified', 'Made in USA', 'Non-GMO'],
};

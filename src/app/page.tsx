import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import VideoBackground from '@/components/VideoBackground';
import Hero from '@/components/Hero';
import ScrollLeaves from '@/components/ScrollLeaves';
import Benefits from '@/components/Benefits';
import ProductDetail from '@/components/ProductDetail';
import ProductCard from '@/components/ProductCard';
import Ingredients from '@/components/Ingredients';
import Usage from '@/components/Usage';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import ComingSoon from '@/components/ComingSoon';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const revalidate = 60; // Revalidate every minute

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON !== 'false';

export default async function Home() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  // Fetch product 1 from Supabase
  const { data: dbProduct, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', '1')
    .single();

  if (error || !dbProduct) {
    console.error("Failed to load product:", error);
    return <div className="p-8 text-center text-red-500">Failed to load product. Please ensure the database is seeded.</div>;
  }

  // Map DB product to the Product type
  const product: Product = {
    ...dbProduct,
    // ensure jsonb arrays are typed correctly
    ingredients: dbProduct.ingredients || [],
    benefits: dbProduct.benefits || [],
    usage: dbProduct.usage || [],
    certifications: dbProduct.certifications || [],
  };

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <ScrollLeaves />
      <main>
        <VideoBackground />
        <Hero />
        <Benefits />
        <ProductDetail product={product} />
        <Ingredients product={product} />
        <Usage product={product} />
        <Reviews />
        <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Beauty?
              </h2>
              <p className="text-xl text-gray-600">
                Start your wellness journey today
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <ProductCard product={product} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import VideoBackground from '@/components/VideoBackground';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import ProductDetail from '@/components/ProductDetail';
import ProductCard from '@/components/ProductCard';
import Ingredients from '@/components/Ingredients';
import Usage from '@/components/Usage';
import Footer from '@/components/Footer';
import ComingSoon from '@/components/ComingSoon';
import { product } from '@/lib/product-data';

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON !== 'false';

export default function Home() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <main>
        <VideoBackground />
        <Hero />
        <Benefits />
        <ProductDetail product={product} />
        <Ingredients product={product} />
        <Usage product={product} />
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

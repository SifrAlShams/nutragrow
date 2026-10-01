import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-green max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including when you make a purchase, sign up for our newsletter, or contact us for support. This may include your name, email address, shipping address, and payment information.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to process your orders, communicate with you about your purchase, provide customer support, and send you marketing communications (if you have opted in).</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Information Sharing</h2>
            <p className="mb-4">We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website, processing payments (e.g., Stripe), and fulfilling orders.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Security</h2>
            <p className="mb-4">We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the absolute security of our systems.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at Nutragrowsupplements@gmail.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

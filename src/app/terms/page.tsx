import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="prose prose-green max-w-none text-gray-600">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">By accessing or using our website and purchasing our products, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the website or use our services.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Products and Medical Disclaimer</h2>
            <p className="mb-4">Our products are dietary supplements. The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure, or prevent any disease. Please consult your healthcare professional about potential interactions or other possible complications before using any product.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Purchases and Payment</h2>
            <p className="mb-4">We accept various forms of payment through our secure payment processor (Stripe). You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Limitation of Liability</h2>
            <p className="mb-4">In no event shall Parsa and Parsa LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at Nutragrowsupplements@gmail.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

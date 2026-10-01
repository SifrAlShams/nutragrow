import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          <div className="prose prose-green max-w-none text-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. 30-Day Money-Back Guarantee</h2>
            <p className="mb-4">We stand behind our products. If you are not completely satisfied with your purchase, we offer a 30-day money-back guarantee. You may return the product within 30 days of receiving your order for a full refund of the purchase price (minus shipping and handling).</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Return Process</h2>
            <p className="mb-4">To initiate a return, please email us at Nutragrowsupplements@gmail.com with your order number and reason for return. We will provide you with instructions on where to send the returned items.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Condition of Returned Items</h2>
            <p className="mb-4">To be eligible for a refund, the product must be in the same condition that you received it, and in its original packaging. Used products or empty bottles are subject to review and may only be eligible for a partial refund or store credit.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Refunds</h2>
            <p className="mb-4">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-7 business days.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
            <p>For more information about our refund practices, please contact us at Nutragrowsupplements@gmail.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

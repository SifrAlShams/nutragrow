import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
          <div className="prose prose-green max-w-none text-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Order Processing Time</h2>
            <p className="mb-4">All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Shipping Rates & Delivery Estimates</h2>
            <p className="mb-4">Shipping charges for your order will be calculated and displayed at checkout. Standard shipping typically takes 3-5 business days within the contiguous United States.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Shipment Confirmation & Order Tracking</h2>
            <p className="mb-4">You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Customs, Duties and Taxes</h2>
            <p className="mb-4">Nutra Grow is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Damages</h2>
            <p className="mb-4">Nutra Grow is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

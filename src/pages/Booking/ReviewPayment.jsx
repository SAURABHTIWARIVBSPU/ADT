// ReviewPayment.js
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import '../../styles/components/ReviewPayment.css';
import { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51N9Qw2SJv...your_test_key_here...'); // Replace with your test key

function PaymentModal({ open, onClose, adventure, certification, totalPrice, user, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate payment intent (replace with real backend call in production)
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[95vw] max-w-md shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">×</button>
        <h2 className="review-title" style={{ textAlign: 'center' }}>Stripe Payment</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
          </div>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
          <button type="submit" className="payment-button" disabled={!stripe || loading}>
            {loading ? 'Processing...' : `Pay $${totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ReviewPayment() {
  const { state } = useLocation();
  const { adventure, certification, totalPrice } = state || {};
  const { user } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [showStripe, setShowStripe] = useState(false);

  if (!adventure) {
    return <div className="no-adventure">No adventure selected</div>;
  }

  const handleProceedToPayment = () => {
    setShowStripe(true);
  };

  const handlePaymentSuccess = () => {
    // Save booking and close modal
    const booking = {
      userId: user?.id,
      adventureId: adventure?.id,
      persons: state?.persons || 1,
      dates: state?.dates || null,
      totalPrice,
      certification,
      status: 'confirmed',
    };
    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('myBookings', JSON.stringify(bookings));
    setShowModal(false);
    setTimeout(() => navigate('/my-bookings'), 800);
  };

  return (
    <Elements stripe={stripePromise}>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[95vw] max-w-md shadow-lg p-6 relative">
            <button onClick={() => { setShowModal(false); navigate(-1); }} className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">×</button>
            <h2 className="review-title">Review Your Booking</h2>
            <div className="review-details">
              <div className="detail-item">
                <span className="label">Adventure:</span>
                <span className="value">{adventure.title}</span>
              </div>
              <div className="detail-item">
                <span className="label">Price:</span>
                <span className="value">${adventure.price}</span>
              </div>
              {certification && (
                <div className="detail-item">
                  <span className="label">Certification:</span>
                  <span className="value">{certification.name} (+${certification.price})</span>
                </div>
              )}
              <div className="detail-item total">
                <span className="label">Total:</span>
                <span className="value">${totalPrice}</span>
              </div>
              <div className="detail-item">
                <span className="label">Booking as:</span>
                <span className="value">{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
            <button className="payment-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      )}
      <PaymentModal
        open={showStripe}
        onClose={() => setShowStripe(false)}
        adventure={adventure}
        certification={certification}
        totalPrice={totalPrice}
        user={user}
        onSuccess={handlePaymentSuccess}
      />
    </Elements>
  );
}
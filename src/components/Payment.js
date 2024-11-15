import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';



function Payment({ totalAmount, handlePaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setError(null);

      // You would send `paymentMethod.id` to your server here to create a charge
      // Example: const response = await fetch('/api/charge', { method: 'POST', body: JSON.stringify({ paymentMethodId: paymentMethod.id }) });

      // For now, simulate successful payment
      handlePaymentSuccess(paymentMethod.id);
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-payment-btn" disabled={loading}>
          {loading ? 'Processing...' : `Pay $${totalAmount}`}
        </button>
      </form>
    </div>
  );
}

function StripePayment({ totalAmount, handlePaymentSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <Payment totalAmount={totalAmount} handlePaymentSuccess={handlePaymentSuccess} />
    </Elements>
  );
}

export default StripePayment;

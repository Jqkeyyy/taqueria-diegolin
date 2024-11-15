import React, { useState, useEffect } from 'react';
import './CheckoutModal.css';

function CheckoutModal({ cartItems, submitOrder, closeModal }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const totalAmount = cartItems
    .reduce((total, item) => total + parseFloat(item.finalPrice || item.basePrice) * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    if (isFormSubmitted) {
      const loadPayPalScript = async () => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=ATcGiaVCKjYaiDrXv5iNt4YUKvJLEBgfs5cDLleKLoVEnyrqKjtMajKsPkfQ8ZYGH8cGshqZqc_0q7pj&currency=USD&components=buttons,funding-eligibility`;

        script.addEventListener('load', () => {
          window.paypal.Buttons({
            style: {
              shape: 'pill', // Pill shape for the buttons
              color: 'blue',
              layout: 'vertical',
              label: 'paypal',
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: totalAmount,
                  },
                }],
              });
            },
            onApprove: async (data, actions) => {
              try {
                const details = await actions.order.capture();
                alert('Transaction completed by ' + details.payer.name.given_name);

                const orderDetails = {
                  payer: details.payer,
                  orderID: data.orderID,
                  name,
                  phoneNumber,
                  instructions,
                  items: cartItems.map(item => ({
                    name: item.name,
                    meat: item.selectedOptions?.meat || 'No meat selected',  // Ensure meat is included
                    toppings: item.selectedOptions?.toppings.join(', ') || 'No toppings selected',
                    quantity: item.quantity,
                    price: item.finalPrice || item.basePrice || '0.00',
                  })),
                  total: totalAmount,
                };

                const response = await fetch('http://192.168.50.73:3001/api/submit-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(orderDetails),
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                  throw new Error(result.error || 'Unknown error occurred');
                }

                console.log('Order submission result:', result);
                submitOrder(orderDetails);
                closeModal();
              } catch (err) {
                console.error('Error during PayPal transaction or order submission:', err);
                setSubmissionError('There was an error processing your order. Please try again.');
              }
            },
            onError: (err) => {
              console.error('PayPal Checkout error:', err);
              setSubmissionError('There was an error with PayPal. Please try again.');
            },
          }).render('#paypal-button-container');
        });
        document.body.appendChild(script);
      };

      loadPayPalScript();
    }
  }, [isFormSubmitted, totalAmount, submitOrder, closeModal, name, phoneNumber, instructions, cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsFormSubmitted(true); // Trigger PayPal button rendering
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal-btn" onClick={closeModal}>
          &times;
        </button>
        <h2>Complete Your Payment</h2>
        {!isFormSubmitted ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Name<span className="required">*</span>:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number<span className="required">*</span>:</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={errors.phoneNumber ? 'input-error' : ''}
                maxLength="10"
                placeholder="Enter 10-digit number"
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Special Instructions:</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows="3"
              />
            </div>
            <button type="submit" className="submit-order-btn">Proceed to Payment</button>
            {submissionError && <p className="error-message">{submissionError}</p>}
          </form>
        ) : (
          <div id="paypal-button-container"></div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;

import React, { useEffect } from 'react';

function Checkout({ totalAmount, submitOrder }) {
  useEffect(() => {
    const loadPayPalScript = async () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AQ1YFxv3EifIpGCRRTDuJIAC4xpfnFfWQxWUmStcQ22q5KWl2VbfVpRov--dH6zfFB3gIdwtU6oXmQkV&currency=USD`;
      script.addEventListener('load', () => {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount, // The total price of the order
                },
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert('Transaction completed by ' + details.payer.name.given_name);
              // Here, you would submit the order to your server
              submitOrder({ payer: details.payer, orderID: data.orderID });
            });
          },
          onError: (err) => {
            console.error('PayPal Checkout error:', err);
          },
        }).render('#paypal-button-container');
      });
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [totalAmount, submitOrder]);

  return (
    <div className="checkout-container">
      <h2>Complete Your Payment</h2>
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default Checkout;

import React from 'react';

function Cart({ cartItems, updateQuantity, removeFromOrder, handleCheckout }) {
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemPrice = item.finalPrice || item.basePrice || '0.00';
        return total + parseFloat(itemPrice.replace('$', '')) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <section className="cart">
      <h2>Your Order</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} ({item.selectedOptions.meat || item.selectedOptions.type})
            {item.selectedOptions.toppings.length > 0 && (
              <span> with {item.selectedOptions.toppings.join(', ')}</span>
            )} - ${item.finalPrice} x {item.quantity}
            <div className="quantity-control">
              <button onClick={() => updateQuantity(item, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item, 1)}>+</button>
              <button onClick={() => removeFromOrder(item)} className="remove-btn">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal()}</h3>
      {cartItems.length > 0 && (
        <button onClick={handleCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
      )}
    </section>
  );
}

export default Cart;


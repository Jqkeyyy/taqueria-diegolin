// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard">
      <h1>Orders Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h3>Order {order.orderID}</h3>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    <strong>{item.name}</strong> - {item.quantity}x - ${item.price} <br />
                    <strong>Meat:</strong> {item.meat || 'No meat selected'} <br />  {/* Ensure meat is displayed */}
                    <strong>Toppings:</strong> {item.toppings || 'No toppings selected'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;

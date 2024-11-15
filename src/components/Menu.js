import React from 'react';
import MenuItem from './MenuItem';
import './Menu.css';

const Menu = ({ addToOrder }) => {
  const menuItems = [
    {
      name: 'Fajitas',
      basePrice: 15.99,
      options: {
        meat: [
          { type: 'Steak' },
          { type: 'Chicken' },
          { type: 'Shrimp', additionalCost: 4.00 },
          { type: 'San Jose', additionalCost: 4.00 },
        ],
        toppings: ['Onions', 'Bell Peppers', 'Tomatoes'],
        sides: ['Rice', 'Beans', 'Guacamole Salad'],
      },
    },
    {
      name: 'Nachos',
      basePrice: 9.99,
      options: {
        meat: [
          { type: 'Steak' },
          { type: 'Chorizo' },
          { type: 'Chicken' },
          { type: 'Supreme', additionalCost: 5.00 },
          { type: 'Nachos Mix', additionalCost: 1.00 },
          { type: 'Nachos Fajita', additionalCost: 5.00 },
        ],
      },
    },
    {
      name: 'Tacos',
      basePrice: 3.50,
      options: {
        meat: [
          { type: 'Chicken' },
          { type: 'Steak' },
          { type: 'Shrimp', additionalCost: 0.25 },
          { type: 'Pastor', additionalCost: 0.25 },
          { type: 'Campechanos', additionalCost: 0.25 },
          { type: 'Lengua', additionalCost: 0.75 },
        ],
        toppings: ['Onions', 'Cilantro', 'Limes', 'Cheese'],
      },
    },
    {
      name: 'Burritos',
      basePrice: 14.99,
      options: {
        meat: [
          { type: 'Steak' },
          { type: 'Chicken' },
        ],
        toppings: ['Rice', 'Beans', 'Sour Cream', 'Guacamole', 'Tomato', 'Cheese Sauce'],
      },
    },
    {
      name: 'Chimichanga',
      basePrice: 13.99,
      options: {
        meat: [
          { type: 'Steak' },
          { type: 'Chicken' },
          { type: 'Shrimp', additionalCost: 1.00 },
        ],
        sides: ['Rice', 'Beans', 'Lettuce Salad', 'Guacamole Cream', 'Tomato'],
      },
    },
    {
      name: 'Quesadilla',
      basePrice: 6.99,
      options: {
        meat: [
          { type: 'Chicken' },
          { type: 'Steak' },
          { type: 'Shrimp', additionalCost: 1.00 },
          { type: 'Pastor', additionalCost: 1.00 },
        ],
      },
    },
    {
      name: 'Quesadilla Grande',
      basePrice: 15.99,
      options: {
        toppings: ['Rice', 'Sour Cream', 'Tomato', 'Onions', 'Bell Peppers', 'Cheese Sauce'],
      },
    },
    // Special Items as individual items
    {
      name: 'DH Special',
      basePrice: 15.99,
      description: 'Rice, Steak, Roasted Chicken, Chorizo, Shrimp, Poblano Pepper, Onion, and Chips on top'
    },
    {
      name: 'Molcahete San Jose',
      basePrice: 26.99,
      description: 'Roasted Chicken, Shrimp, Cactus, Banana Pepper'
    },
    {
      name: 'Arroz Con Pollo',
      basePrice: 9.99,
      description: 'Chicken with rice and cheese'
    },
    {
      name: 'Arroz Con Carne',
      basePrice: 9.99,
      description: 'Steak with rice and cheese'
    },
    {
      name: 'Arroz Con Camarones',
      basePrice: 12.99,
      description: 'Shrimp with rice and cheese'
    },
    {
      name: 'Ceviche',
      basePrice: 15.99,
      description: 'Fresh fish cured in lime juice, with onions, cilantro, and tomatoes'
    },
    {
      name: 'Beverage/Bebidas',
      basePrice: 3.25,
      options: {
        types: [
          { type: 'Jarritos' },
          { type: 'Jamaica', additionalCost: 0.50 },
          { type: 'Horchata', additionalCost: 0.50 },
          { type: 'Mexican Coca Cola', additionalCost: 0.50 },
        ],
      },
    },
  ];

  return (
    <div className="menu-grid">
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index} item={menuItem} addToOrder={addToOrder} />
      ))}
    </div>
  );
};

export default Menu;


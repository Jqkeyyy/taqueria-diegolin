import React, { useState } from 'react';

const MenuItem = ({ item, addToOrder }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    meat: item.meat ? item.meat[0] : '', // Default to the first meat option
    toppings: item.toppings ? [...item.toppings] : [], // Default to all toppings selected
  });
  const [quantity, setQuantity] = useState(1);

  const handleOptionChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'meat') {
      setSelectedOptions({
        ...selectedOptions,
        meat: value, // Update selected meat
      });
    } else if (name === 'toppings') {
      setSelectedOptions({
        ...selectedOptions,
        toppings: checked
          ? [...selectedOptions.toppings, value]
          : selectedOptions.toppings.filter((t) => t !== value),
      });
    }
  };

  const handleAddToOrder = () => {
    addToOrder({ ...item, selectedOptions, quantity });
  };

  return (
    <div className="menu-item">
      <h3>{item.type || item.name}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>

      {item.meat && (
        <div>
          <h4>Select Meat</h4>
          {item.meat.map((meat, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="meat"
                  value={meat}
                  checked={selectedOptions.meat === meat}
                  onChange={handleOptionChange}
                />
                {meat}
              </label>
            </div>
          ))}
        </div>
      )}

      {item.toppings && (
        <div>
          <h4>Select Toppings</h4>
          {item.toppings.map((topping, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  name="toppings"
                  value={topping}
                  checked={selectedOptions.toppings.includes(topping)}
                  onChange={handleOptionChange}
                />
                {topping}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="quantity-control">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button onClick={handleAddToOrder}>Add to Order</button>
    </div>
  );
};

export default MenuItem;

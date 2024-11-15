import React, { useState, useEffect, useRef } from 'react';
import './Menu.css';

const MenuItem = ({ item, addToOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeat, setSelectedMeat] = useState(
    item.options?.meat ? item.options.meat[0]?.type : null
  );
  const [selectedType, setSelectedType] = useState(
    item.options?.types ? item.options.types[0]?.type : null
  );
  const [selectedToppings, setSelectedToppings] = useState(
    item.options?.toppings ? [...item.options.toppings] : []
  );
  const [quantity, setQuantity] = useState(1);

  const modalRef = useRef(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleOptionChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'meat') {
      setSelectedMeat(value);
    } else if (name === 'type') {
      setSelectedType(value);
    } else if (name === 'toppings') {
      setSelectedToppings((prevToppings) =>
        checked
          ? [...prevToppings, value]
          : prevToppings.filter((t) => t !== value)
      );
    }
  };

  const handleAddToOrder = () => {
    let finalPrice = item.basePrice;

    if (item.options?.meat) {
      const selectedMeatOption = item.options.meat.find(
        (meat) => meat.type === selectedMeat
      );
      if (selectedMeatOption && selectedMeatOption.additionalCost) {
        finalPrice += selectedMeatOption.additionalCost;
      }
    }

    if (item.options?.types) {
      const selectedTypeOption = item.options.types.find(
        (type) => type.type === selectedType
      );
      if (selectedTypeOption && selectedTypeOption.additionalCost) {
        finalPrice += selectedTypeOption.additionalCost;
      }
    }

    addToOrder({
      ...item,
      selectedOptions: {
        meat: selectedMeat,
        type: selectedType,
        toppings: selectedToppings,
      },
      quantity,
      finalPrice: (finalPrice * quantity).toFixed(2),
    });
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="menu-item">
      <div onClick={toggleModal}>
        <img
          src="https://via.placeholder.com/150"
          alt={item.name || item.type}
          className="menu-item-image"
        />
        <h3>{item.name || item.type}</h3>
        <p className="price">${item.basePrice.toFixed(2)}</p>
      </div>
      <button onClick={toggleModal} className="customize-btn">
        Customize
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
            <h4>{item.name}</h4>
            {/* Display Price below the name */}
            <p className="modal-price">Price: ${item.basePrice.toFixed(2)}</p>

            {item.description && (
              <p className="item-description">{item.description}</p>
            )}

            {item.options?.meat && (
              <div>
                <h4>Select Meat</h4>
                {item.options.meat.map((meat, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="meat"
                        value={meat.type}
                        checked={selectedMeat === meat.type}
                        onChange={handleOptionChange}
                      />
                      {meat.type}
                      {meat.additionalCost
                        ? ` + $${meat.additionalCost.toFixed(2)}`
                        : ''}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {item.options?.types && (
              <div>
                <h4>Select Type</h4>
                {item.options.types.map((type, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value={type.type}
                        checked={selectedType === type.type}
                        onChange={handleOptionChange}
                      />
                      {type.type}
                      {type.additionalCost !== undefined
                        ? ` - $${(item.basePrice + type.additionalCost).toFixed(
                            2
                          )}`
                        : `$${item.basePrice.toFixed(2)}`}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {item.options?.toppings && (
              <div>
                <h4>Select Toppings</h4>
                {item.options.toppings.map((topping, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="toppings"
                        value={topping}
                        checked={selectedToppings.includes(topping)}
                        onChange={handleOptionChange}
                      />
                      {topping}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div className="quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button onClick={handleAddToOrder} className="add-to-order-btn">
              Add to Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;

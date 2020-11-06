import React, { useState } from "react";
import { setCookie, getCookie } from "../repository";

export default function ProductItem({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (event) => setQuantity(event.target.value);

  const addToCart = () => {
    let cart = getCookie('cartdata')
      ? JSON.parse(getCookie('cartdata'))
      : {};
    let id = product.id.toString();
    cart[id] = cart[id] ? cart[id] : 0;
    let qty = cart[id] + parseInt(quantity);
    if (product.available_quantity < qty) {
      cart[id] = product.available_quantity;
    } else {
      cart[id] = qty;
    }
    setCookie("cartdata", JSON.stringify(cart), 30);
  };

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">
        <h4 className="card-title">{product.name}</h4>
        <p className="card-text">{product.description}</p>
        <h5 className="card-text">
          <small>price: </small>${product.price}
        </h5>
        <span className="card-text">
          <small>Available Quantity: </small>
          {product.available_quantity}
        </span>

        {product.available_quantity > 0 ? (
          <div>
            <button
              className="btn btn-sm btn-warning float-right"
              onClick={addToCart}
            >
              Add to cart
            </button>
            <input
              type="number"
              value={quantity}
              name="quantity"
              onChange={handleInputChange}
              className="float-right"
              style={{
                width: "60px",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            />
          </div>
        ) : (
          <p className="text-danger"> product is out of stock </p>
        )}
      </div>
    </div>
  );
}

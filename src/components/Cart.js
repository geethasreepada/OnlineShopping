import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {getCartProductsList, getCookie,setCookie, deleteCookie } from "../repository";
import CartItem from "./CartItem";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    let cart = getCookie('cartdata');
    if (!cart) return;
    async function fetchData() {
    let res = await getCartProductsList(cart);
    res
      .json()
      .then((res) => {
        let total = 0;
        for (var i = 0; i < res.length; i++) {
          total += res[i].price * res[i].qty;
        }
        setProducts(res)
        setTotal(total);
      })
      .catch((err) => setErrors(err));
  }
    fetchData();
  }, []);

  const removeFromCart = (product) => {
    let filteredProducts = products.filter((item) => item.id !== product.id);
    let cart = JSON.parse(getCookie('cartdata'));
    delete cart[product.id.toString()];
    setCookie('cartdata', JSON.stringify(cart));
    let updatedTotal = total - product.qty * product.price;
    setProducts(filteredProducts);
    setTotal(updatedTotal);
  };

  const clearCart = () => {
    deleteCookie('cartdata');
    setProducts([]);
  };

  return (
    <div className=" container">
      <h3 className="card-title">Cart</h3>
      <hr />
      {products.map((product, index) => (
        <CartItem product={product} remove={removeFromCart} key={index} />
      ))}
      <hr />
      {products.length ? (
        <div>
          <h4>
            <small>Total Amount:</small>
            <span className="float-right text-primary">${total}</span>
          </h4>
          <hr />
        </div>
      ) : (
        ""
      )}

      {!products.length ? (
        <h3 className="text-warning">No item on the cart</h3>
      ) : (
        ""
      )}
      <Link to="/checkout">
        <button className="btn btn-success float-right">Checkout</button>
      </Link>
      <button
        className="btn btn-danger float-right"
        onClick={clearCart}
        style={{ marginRight: "10px" }}
      >
        Clear Cart
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

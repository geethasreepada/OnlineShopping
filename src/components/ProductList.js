import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import {getProductList } from '../repository';
import { Link } from 'react-router-dom';

const ProductList = function() {

	const [products, setProductList] = useState('');
	const [hasError, setErrors] = useState(false);


	useEffect(() => {
		async function fetchData() {
		let res = await getProductList()
		res.json().then(pro => {
				setProductList(pro)
			})
			  .catch(err => setErrors(err));
		  }
		  fetchData();
	  },[]);

	const productData = Array.from(products);

	  return (
		<div className=" container">
				<h3 className="card-title">List of Available Products</h3>
				<hr/>
				{
					productData.map((product, index) => <ProductItem product={product} key={index}/>)
				}
				<hr/>
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<Link to="/cart"><button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>View Cart</button></Link>
				<br/><br/><br/>
		</div>
	  );
}

export default ProductList;
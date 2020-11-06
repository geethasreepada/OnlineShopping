import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export async function getProductList() {
	return await fetch("http://localhost:5000/api/products")
	 .then(res => res);
}

export async function getCartProductsList(cart) {
	const config = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: cart
	  }
	  return await fetch("http://localhost:5000/api/products", config)
	  .then(res => res);
}

export async function loginUser (data) {
	const config = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({name: data.name, password: data.password })
	  }
	  return await fetch(`${BASE_URL}/api/auth`, config)
	  .then(res => res)
	  .catch(err =>  Promise.reject('Authentication Failed!'));
}

export function deleteCookie(cname) {
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function isAuthenticated(){
	return getCookie('x-access-token') && getCookie('x-access-token-expiration') > Date.now()
}

export function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	return document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}

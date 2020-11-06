import React, { useState } from "react";
import { loginUser, setCookie } from "../repository";

export default function Login() {
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const submitLogin = (event) => {
    event.preventDefault();
    async function fetchData() {
      let res = await loginUser(state);
      res.json()
      .then((token) => {
        console.log("res", token);
        if(token != "banned") {
        setCookie('x-access-token', token);
        setCookie('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
        window.location = "/";
        } else {
          alert("user banned");
        }
      })
      .catch((err) => alert(err));
    }
    fetchData();
  };

  return (
    <div className="container">
      <hr />
      <div className="col-sm-8 col-sm-offset-2">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Log in </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={submitLogin}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

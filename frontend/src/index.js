import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log("Current Origin: ", window.location.origin);

root.render(
  <Auth0Provider
    domain="dev-bjnpoaj8rqopaxxf.us.auth0.com"
    clientId="zQU67Vbl3TokP0bJ6AxdEE9dKdPixdKd"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

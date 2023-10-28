import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProductContextProvider } from "./context/ProductsContext";
import { UserContextProvider } from "./context/UserContext";
import { CartContextProvider } from "./context/CartContext";
import { URLContextProvider } from "./context/URLContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <URLContextProvider>
      <UserContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </UserContextProvider>
    </URLContextProvider>
  </React.StrictMode>
);

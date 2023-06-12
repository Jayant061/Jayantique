import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ProductContextProvider } from './context/ProductsContext'
import { UserContextProvider } from './context/UserContext'
import { CartContextProvider } from './context/CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <UserContextProvider>
  <ProductContextProvider>
    <CartContextProvider>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </CartContextProvider>
  </ProductContextProvider>
  </UserContextProvider>
);

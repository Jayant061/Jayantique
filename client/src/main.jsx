import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ProductContextProvider } from './context/ProductsContext'
import { UserContextProvider } from './context/UserContext'
import { CartContextProvider } from './context/CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
  <UserContextProvider>
  <ProductContextProvider>
    <CartContextProvider>
    <App/>
  </CartContextProvider>
  </ProductContextProvider>
  </UserContextProvider>
  </React.StrictMode>
);

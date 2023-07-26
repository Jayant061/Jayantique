import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { accessToken } from '../../credentials';
import jwtDecode from 'jwt-decode';

function PaymentDetails() {
  const [cartData,setCartData] = useState([]);
  const {cartItems,itemsQuantity} = useContext(CartContext);

  console.log(jwtDecode(localStorage.getItem(accessToken)));
  const data = 5;
  return (
    <div className='PaymentDetails'>
        Payment Details
    </div>
  )
}

export default PaymentDetails
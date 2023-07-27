import React, { useContext } from 'react';
import axios from "axios";
import { CartContext } from '../../context/CartContext'
import { baseURL } from '../../credentials';
function PaymentDetails() {
  const {cartItems,itemsQuantity} = useContext(CartContext);
  const cartData = cartItems?.map((item)=>{
    return {
      itemId:item?._id,
      quantity:itemsQuantity.get(item?._id)
    }
  });
  async function handleClick(){
    
    try {
    const res = await axios.post(`${baseURL}/checkout`,{data:cartData});
    window.location.href = res.data.url;
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className='PaymentDetails'>
      <button onClick={handleClick}>Pay</button>

    </div>
  )
}

export default PaymentDetails
import React, { useContext, useEffect, useState } from 'react'

import "./cartPageStyles.css";
import CartItem from './cartItem';
import DeliveryAvailabilty from './DeliveryAvailabilty';
import CartBilling from './CartBilling';
import { CartContext } from '../../context/CartContext';


function Cart() {
  useEffect(()=>{
    document.title = "Jayantique | Cart"
  },[])
    const {cartItems,addedItems,itemsQuantity} = useContext(CartContext);
    const items = cartItems?.map(item=>{
             return(
        <CartItem product = {item} key={item?._id} qty = {itemsQuantity.get(item?._id)}/>
       )
    });
  return (
    <>
    { items.length === 0? <div className='emptyCart'>
      <span >Add joy, add items - let's complete your cart! <br/>
      Turn an empty cart into a cart full of dreams!!</span></div>:
      <div className='cart'>
        <div className="promotion">
        <span>Shop for $500 and more and get 10% discount on your order</span>
        </div>
        <span style={{fontFamily:"poppins"}}className='cartHeading'>Shopping cart</span>
        <div className="cartWrapper">
            <div className="wrapperHeader">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
            </div>
        <div className="cartItems">
        {items}
        </div>
        <div className="billing">
          <DeliveryAvailabilty/>
          <CartBilling />
        </div>
        </div>
        </div>}
        </>
  )
}

export default Cart
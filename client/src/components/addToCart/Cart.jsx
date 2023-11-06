import React, { Suspense, lazy, useContext, useEffect, useRef } from "react"

import "./cartPageStyles.css";
import { CartContext } from "../../context/CartContext";
import LoadingSpinner from "../../assets/loadingSpinner/LoadingSpinner";
const CartItem = lazy(()=>import("./CartItem"));
const DeliveryAvailabilty = lazy(()=>import("./DeliveryAvailabilty"));
const CartBilling = lazy(()=>import("./CartBilling"));

function Cart() {
  const cartRef = useRef();
  useEffect(()=>{
    document.title = "Jayantique | Cart"
    cartRef?.current?.scrollIntoView();
  },[])
    const {cartItems,addedItems,itemsQuantity} = useContext(CartContext);
    const items = cartItems?.map(item=>{
             return(
        <Suspense key={item?._id} fallback = {<LoadingSpinner/>}><CartItem product = {item} key={item?._id} qty = {itemsQuantity.get(item?._id)}/></Suspense>
       )
    });
  return (
    <>
    { items.length === 0? <div className="emptyCart">
      <span >Add joy, add items - let's complete your cart! <br/>
      Turn an empty cart into a cart full of dreams!!</span></div>:
      <div className="cart">
        <div className="promotion" ref={cartRef}>
        <span>Shop for ₹2000 and more and get 10% discount on your order</span>
        </div>
        <span style={{fontFamily:"poppins"}}className="cartHeading">Shopping cart</span>
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
        <Suspense fallback = {<LoadingSpinner/>}><DeliveryAvailabilty/></Suspense>
        <Suspense fallback = {<LoadingSpinner/>}><CartBilling /></Suspense>
        </div>
        </div>
        </div>}
        </>
  )
}

export default Cart
import React, { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import { CartContext } from '../../context/CartContext';

function CartBilling() {
    const {price,quantity,deliveryCharge} = useContext(CartContext);
    const totalProductCost = parseFloat(price).toFixed(2);
    const [discount,setDiscount] = useState(0);
    const totalCost = parseFloat(totalProductCost) + deliveryCharge - discount;
    useEffect(()=>{
        if(totalProductCost){
            if(parseFloat(totalProductCost) >500){
                setDiscount(parseFloat(totalProductCost)*0.1);
            }
            else{
                setDiscount(0);
            }
        }
        
    },[price]);
  return (
    <div className='cartBilling'>
        <span className='costHeading'>Order Summary ( {quantity} {quantity === 1 ? "item":"items"})</span>
        <div className="totalCost childCost">
            <span>Subtotal</span>
            <span className='cost'>{totalProductCost>0? totalProductCost:parseFloat(0).toFixed(2)} $</span>
        </div>
        <div className="discount childCost">
            <span>Total Discount</span>
            <span className='cost'>{discount && "-" + parseFloat(discount).toFixed(2)} $</span>
        </div>
        <div className="shipping childCost">
            <span>Standard Shipping</span>
            <span className='cost'>{deliveryCharge===0? "Free": parseFloat(deliveryCharge).toFixed(2) + " $"}</span>
        </div>
        <div className="orderTotal childCost">
            <span>Oder total</span>
            <span className='totalCost'>{totalCost>0? parseFloat(totalCost).toFixed(2):"---"} $</span>
        </div>
        <div className="buttons">
            <Link to={"/products"} style={{textDecoration:"none"}}><span className="continueShopping">CONTINUE SHOPPING</span></Link>
            <Link to={"/checkout"} style={{textDecoration:"none"}}><span className="checkout">CHECKOUT</span></Link>
        </div>
    </div>
  )
}

export default CartBilling
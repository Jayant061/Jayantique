import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { addToCart, addCartItemsId } from '../../../credentials.js';
import { CartContext } from '../../context/CartContext';
import LazyImage from '../lazyImage/LazyImage.jsx';

function Product({product}) {
  const [isAddedToCart,setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const {cartDispatch,cartItems,addedItems} = useContext(CartContext);
    function handleClick(){
        navigate("/product/" + product._id);
    }
    function handleAddToCart(){
      cartDispatch({
        type:addToCart,
        payload:product
      });
      cartDispatch({
        type: addCartItemsId,
        payload:product._id
      });
      setIsAddedToCart(true);
    }
    useEffect(()=>{
if(addedItems?.has(product._id)){
  setIsAddedToCart(true);
}
    },[cartItems]);
  return (
    <div className="product" >
      {/* <img src={product.image} alt="" onClick={handleClick}/> */}
      <LazyImage id = {product._id} src={product.image} alt={product.title} handleClick ={handleClick}/>
      <div className="itemContent">
      <h4 className="productName">{product.title}</h4>
      <p>₹ {(parseFloat(product.price)*80).toFixed(2)}</p>
      </div>
{     isAddedToCart? 
  <span className="addToCart">Added to cart</span>
:
<span className="addToCart"  onClick={handleAddToCart}>Add to cart</span>
}    </div>
  )
}

export default Product
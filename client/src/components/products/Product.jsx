import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, addCartItemsId } from "../../../credentials.js";
import { CartContext } from "../../context/CartContext";
import LazyImage from "../lazyImage/LazyImage.jsx";
import cartOutline from "../../assets/cartOutline.svg";
import cartFill from "../../assets/cartFill.svg"

function Product({ product }) {
  // this code is to maintain the minimum height of div to improve lazyImage and load min image in begining
  const [isDivHeight,setIsDivHeight] = useState(true)
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const { cartDispatch, cartItems, addedItems } = useContext(CartContext);
  function handleClick() {
    navigate("/product/" + product._id);
  }
  function handleAddToCart() {
    cartDispatch({
      type: addToCart,
      payload: product,
    });
    cartDispatch({
      type: addCartItemsId,
      payload: product._id,
    });
    setIsAddedToCart(true);
  }
  useEffect(() => {
    if (addedItems?.has(product._id)) {
      setIsAddedToCart(true);
    }
  }, [cartItems]);
  function setDivHeight(){
    setIsDivHeight(false);
  }
  return (
    <div className="product" style={isDivHeight?{aspectRatio:"3 / 4"}:{}}>
      {/* <img src={product.image} alt="" onClick={handleClick}/> */}
      <LazyImage
        id={product._id}
        src={ product.images[0]}
        alt={product.title}
        onLoad={setDivHeight}
        handleClick={handleClick}
      />
      <div className="itemContent" onClick={handleClick}>
        <h4 className="productName">{product?.title}</h4>
        <p>₹ {product?.price}</p>
      </div>
      {!isDivHeight && (isAddedToCart ?
        (<img src={cartFill} className="addToCart" onClick={()=>{navigate("/addToCart")}}/> )
        :(<img src={cartOutline} className="addToCart" onClick={handleAddToCart}/>)
        )}
    </div>
  );
}

export default Product;

{/* (
          <span className="addToCart"onClick={()=>{navigate("/addToCart")}}>Go to cart</span>
        ) : (
          <span className="addToCart" onClick={handleAddToCart}>
            Add to cart
          </span>
        ) */}

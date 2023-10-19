import React, { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Product from './Product';
const Product = lazy(()=>import("./Product"));

import { CartContext } from '../../context/CartContext';
import { addToCart, addCartItemsId, baseURL, getProducts } from '../../../credentials.js';
import star from "../../assets/star.svg";
import hollowStar from "../../assets/starHollow.svg";
import halfStar from "../../assets/starHalf.svg";
import loader from "../../assets/loading.svg";
import "./product.css";

function ProductDescription() {
  const ref = useRef()
  const navigate = useNavigate();
  const {state,dispatch} = useContext(ProductContext);
  const {params} = useParams();
  const [item,setItem] = useState({});
  let stars = [1,2,3,4,5];
    const rate =item?.rating?.rate;
    stars = stars.map((i)=>{
        if(i<=rate){
        return(<img src={star} alt='' key={i}/>)
        }
        else if((i-rate)<1){
        return(<img src={halfStar} alt=''  key={i}/>)
        }
        else{
         return(<img src={hollowStar} alt=''  key={i}/>)
        }
  })
  useEffect(()=>{
    document.title = item?.title
    ref.current?.scrollIntoView({behavior:"smooth"});
    // sessionStorage.setItem("isProductReq","true");
  },[item]);
  useEffect(()=>{
    let subs = true;
    const getItem = async()=>{
      const res = await axios.get(`${baseURL}/products?itemId=${params}`);
      setItem(res.data.find(i=>{if(i._id === params)return i}));
      dispatch({
        type:"similarProducts",
        payload:res.data
      });
    }
    subs && getItem();
    return()=>{
      subs = false;
    }
  },[params]);
const[isAddedToCart,setIsAddedToCart] = useState(false);
const {cartDispatch,cartItems,addedItems} = useContext(CartContext);
function handleAddToCart(){
    cartDispatch({
      type:addToCart,
      payload:item
    });
    cartDispatch({
      type: addCartItemsId,
      payload:item?._id
    });
    setIsAddedToCart(true);
  }
  useEffect(()=>{
    if(addedItems?.has(item?._id)){
      setIsAddedToCart(true);
    }
    else{
      setIsAddedToCart(false);
    }
  },[cartItems,addedItems,item]);
  function handleBuyNow(){
    !isAddedToCart && handleAddToCart();
    navigate("/addToCart");
  }
  let similarProductItems = state?.similarProducts?.filter(product =>product._id !== item._id);
    similarProductItems = similarProductItems?.map((product,index)=>{return(
    <Suspense fallback = {<div>Loadinng...</div>} key={index}><Product product = {product} key={product._id}/></Suspense>

    )});

 return (
   <div className='productDescription'>
    {item?._id?
    <>
    <div className="descriptionWrapper" ref={ref}>
      <div className="descriptionLeft">
          <img src={item?.image} alt="" className='productImg' />
      </div>
      <div className="descriptionRight">
        <div className="titleNPrice">
          <h2>{item?.title}</h2>
          <h4>₹ {(parseFloat(item?.price)*80).toFixed(2)}</h4>
        </div>
        <div className="item-category">
          <span>{item?.category}</span>
        </div>
        

      <div className="buttons">
        {isAddedToCart?
        <span style={{backgroundColor:"#13395B",color:"white"}} onClick={()=>{navigate("/addToCart")}}>Go to cart</span>
        :
        <span onClick={handleAddToCart} >Add to cart</span>
      }
        <span onClick={handleBuyNow}>Buy Now</span>
      </div>
      <span className='itemDescription'>{item?.description}</span>
      <div className="rating">
          <div className="rate">{stars}</div>
          <span className="ratingCount">({item?.rating.count}) reviews</span>
        </div>
      </div>
      </div>
      <div className='similarProductsHeading'>
      <h4>Similar Products</h4>
      </div>
      <div className="similarProducts">
        {similarProductItems.length && similarProductItems}
      </div>
    </>:<img src={loader} alt = "loading icon"/>}
    </div>
  )
}

export default ProductDescription
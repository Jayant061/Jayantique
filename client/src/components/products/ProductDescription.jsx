import React, { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Product from './Product';
const Product = lazy(()=>import("./Product"));

import { CartContext } from '../../context/CartContext';
import { addToCart, addCartItemsId, baseURL, getProducts } from '../../../credentials.js';
import star from "../../assets/star.svg";
import "./product.css";

function ProductDescription() {
  const ref = useRef()
  const navigate = useNavigate();
  const {state,dispatch} = useContext(ProductContext);
  const {params} = useParams();
  const [item,setItem] = useState({});
  const [itemSize,setItemSize] = useState([]);
  const [itemSizeId,setItemSizeId] = useState(null);
  const [note,setNote] = useState("");
  
  const [currImg,setCurrImg] = useState();
  useEffect(()=>{
    document.title = item?.title
    ref.current?.scrollIntoView({behavior:"smooth"});
    item?.images?.length && setCurrImg(item.images[0]);
    if(item?.category?.includes("Footwear")){
      setItemSize(["6","7","8","9","10",]);
    }
    else if(item?.category?.includes("cloth")){
      setItemSize(["S","M","L","XL","XXL",]);
    }
    else if((item?.category)?.toLowerCase()?.includes("bedsheet")){
      setItemSize(["Single","Double","Queen","King"]);
    }
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
    if(itemSizeId === null){
      setNote("Note: Please select size before proceeding")
    }
    else{
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
    if(itemSizeId === null){
      setNote("Note: Please select size before proceeding")
    }
    else{
      !isAddedToCart && handleAddToCart();
    navigate("/addToCart");
  }
  }
  let similarProductItems = state?.similarProducts?.filter(product =>product?._id !== item?._id);
    similarProductItems = similarProductItems?.map((product,index)=>{return(
    <Suspense fallback = {<div>Loadinng...</div>} key={index}><Product product = {product} key={product._id}/></Suspense>

    )});
    const imgs = item?.images?.map((img,index)=>{
      return(
        <img src={img} key={index} onClick={()=>{setCurrImg(img)}}
        style={img === currImg?{border:"1px solid gray"}:{}}/>
      )
    });
    const productSize = itemSize.length &&  itemSize.map((item,index)=>{
      return(
        <div className="eachSize" key={index} id={index}
        onClick={()=>{setItemSizeId(index)}}
        style={itemSizeId === index ?{backgroundColor:"#13395b",color:"white"}:{}}
        ><span>{item}</span></div>
      )
    });
    const descriptions = item?.description && item?.description?.split(',');
    const descriptionsEl = descriptions?.length && descriptions?.map((des,index)=>{
      return (
        <p key={index}>{des}</p>
      )
    })
 return (
   <>
   <div className="productDescription">
    <div className="imgSection">
  <div className="mainImg">
    <img src={currImg} alt="" />
  </div>
  <div className="images">
  {imgs}
  </div>
    </div>
    <div className="contentSection">
      <div className="title">
        <h2>{item?.title}</h2>
      </div>
      <div className="ratings">
        <h3>{item?.rating?.rate} <img src={star}/></h3>
        <span>{item?.rating?.count} Ratings</span>
      </div>
      <div className="price">
        <h3>₹{item?.price}</h3>
        <span>MRP: ₹{parseInt(2.5*item?.price)}</span>
        <p>60% Off</p>
      </div>
      {productSize.length && <div className="productSize">
        <h4>Select Size:</h4>
        <div className="sizes" onClick={()=>{setNote("")}}>
          {productSize}
        </div>
        </div>}
        {note && <div className='note'>
          <span style={{color:"red"}}>{note}</span></div>}
        <div className="buttons">
          {!isAddedToCart?<button onClick={handleAddToCart}>Add to Cart</button>
          : <button>Added to Cart</button>}
          <button onClick={handleBuyNow}>Buy Now</button>
      </div>
      <div className="itemDescription">
        <h3>Product Details</h3>
        <div className="descriptions">
          <h4>Descriptions:</h4>
          <>{descriptionsEl}</>
        </div>
        <div className="category">
          <h4>Category:</h4>
          {item?.category}
        </div>
      </div>
    </div>
   </div>
   </>
  )
}

export default ProductDescription
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../../context/ProductsContext'
import { useParams,useNavigate } from 'react-router-dom';
import star from "../../assets/star.svg";
import hollowStar from "../../assets/starHollow.svg";
import halfStar from "../../assets/starHalf.svg";
import Product from './Product';
import { addToCart, addCartItemsId, baseURL, getProducts } from '../../credentials';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';

function ProductDescription() {
  const ref = useRef()
  const navigate = useNavigate();
  const {state,dispatch} = useContext(ProductContext);
  const {params} = useParams();
  const item = state.products?.find(product=>product._id === params);
  let stars = [1,2,3,4,5];
    const rate =item?.rating.rate;
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
  let similarProducts = state.products.filter(product =>product.category === item?.category && product._id !== item._id);
    similarProducts = similarProducts?.map(product=>{return(<Product product = {product} key={product._id}/>)})
  useEffect(()=>{
    document.title = item?.title
    ref.current?.scrollIntoView({behavior:"smooth"});
  },[item]);
  useEffect(()=>{
    const getItem = async()=>{
      const res = await axios.get(`${baseURL}/products?itemId=${params}`);
      dispatch({
        type:getProducts,
        payload:res.data
      });
    }
    getItem();
  },[])
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

 return (
   <div className='productDescription' ref={ref}>
    <div className="descriptionWrapper">
      <div className="descriptionLeft">
          <img src={item?.image} alt="" className='productImg' />
      </div>
      <div className="descriptionRight">
        <div className="titleNPrice">
          <h2>{item?.title}</h2>
          <h4>$ {item?.price}</h4>
        </div>
        <div className="rating">
          <div className="rate">{stars}</div>
          <span className="ratingCount">({item?.rating.count}) reviews</span>
        </div>
        <span className='itemDescription'>{item?.description}</span>

        <span className='itemCategory'>{item?.category}</span>
      <div className="buttons">
        {isAddedToCart?
        <span style={{backgroundColor:"#13395B",color:"white"}} onClick={()=>{navigate("/addToCart")}}>Go to cart</span>
        :
        <span onClick={handleAddToCart} >Add to cart</span>
        }
        <span>Buy Now</span>
      </div>
      </div>
      </div>
        <h4 className='similarProductsHeading'>Similar Products</h4>
      <div className="similarProducts">
        {similarProducts && similarProducts}
      </div>
    </div>
  )
}

export default ProductDescription
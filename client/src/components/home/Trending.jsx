import React,{ useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./home.css";
import LazyImage from '../lazyImage/LazyImage';
import loader from "../../assets/loading.svg";
// import loader from "../../assets/loading-loop.svg";
import { addCartItemsId, addToCart, baseURL } from '../../../credentials.js';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function Trending() {
  const [trendingProduct,setTrendingProduct] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const {cartDispatch} = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const getTrendingProducts = async()=>{
      try {  
        const res = await axios.get(`${baseURL}/products?trendingProduct=true`);
        setTrendingProduct(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    getTrendingProducts();
  },[]);
  function handleBuyNow(item){
      cartDispatch({
        type:addToCart,
        payload:item
      });
      cartDispatch({
        type: addCartItemsId,
        payload:item?._id
      });
      navigate("/addToCart")
  }
  const trendingItems =trendingProduct[0] && trendingProduct?.map(item=>{
   return (
    <div className="trendingProduct" key={item.id}>
    <div className="texts">
    <h4 onClick={()=>{navigate(`/product/${item._id}`)}}>{item.title}</h4>
    <p>{item.description}</p>
    <button className='priceBtn' onClick={()=>{handleBuyNow(item)}}
    > Buy Now @ ₹ {parseFloat(item.price*80).toFixed(2)}</button>
    </div>
    <div className="trPrImg">
    <LazyImage src={item.image} alt={`product image`} id={item.id}/>

    </div>
  </div>
   )
  })
  return (
    <div className='trending'>
      <span>Trending Now</span>
      <div className="trendingProducts" style={loading?{justifyContent:"center"}:{justifyContent:"space-between"}}>
      {loading ?<img src={loader} style={{width:"120px"}} alt="three dots loading"/>: trendingItems}
      {error && <p style={{color:'red'}}>{error}</p>}
      </div>
    </div>
  )
}

export default Trending
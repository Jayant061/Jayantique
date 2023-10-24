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
        res.status===200 && setTrendingProduct(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    const timeOut = setTimeout(()=>{
      getTrendingProducts();
      
    },1000);
    return()=>{clearTimeout(timeOut)}
  },[]);
  // function handleBuyNow(item){
  //     cartDispatch({
  //       type:addToCart,
  //       payload:item
  //     });
  //     cartDispatch({
  //       type: addCartItemsId,
  //       payload:item?._id
  //     });
  //     navigate("/addToCart")
  // }
  const trendingItems = trendingProduct.length && trendingProduct?.map((items,index)=>{
   
    const products = items.map((item)=>{
    return(
      <div className="trendingProduct" key={item.id}>
      <LazyImage src={item.images[0]} alt={`product image`} id={item.id}/>
      <div className="texts">
      <h4 onClick={()=>{navigate(`/product/${item._id}`)}}>{item.title}</h4>
      <p>₹ {item.price}</p>
      </div>
    </div>);
    });
    return (
      <div className="trending" key={index}>
      {index ===0 && <h4>In Men</h4>}
      {index ===1 && <h4>In Women</h4>}
      {index ===2 && <h4>In Home Decor</h4>}
      <div className='trendingProducts'
      style={index===0?{backgroundColor: "#e3e3e377"}:{}}>
      {products}
      </div>
      </div>
    )
  })
  return (
    <div className='trendingPage'>
      <span>Trending Now</span>
      {loading?<img src={loader} alt='loading...' style={{width:"300px"}}/>:<></>}
      {error? <span style={{textAlign:"center",color:"red"}}>{error}</span>:<></>}
      {trendingItems.length?trendingItems:<></>}
    </div>
  )
}

export default Trending
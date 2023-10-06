import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import "./home.css";
import LazyImage from '../lazyImage/LazyImage';
import loader from "../../assets/loading.svg";
import { baseURL, trendingItemsId} from '../../../credentials.js';
import { useNavigate } from 'react-router-dom';

function Trending() {
  const [trendingProduct,setTrendingProduct] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const getTrendingProducts = async()=>{
      try {  
        const res = await axios.get(`${baseURL}/products?trendingProduct=true&id1:${trendingItemsId[0]}&id2:${trendingItemsId[1]}&id3:${trendingItemsId[2]}`);
        setTrendingProduct(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    getTrendingProducts();
  },[]);
  const trendingItems =trendingProduct[0] && trendingProduct?.map(item=>{
   return (
    <div className="trendingProduct" key={item.id}>
    <div className="texts">
    <h4 onClick={()=>{navigate(`/product/${item._id}`)}}>{item.title}</h4>
    <p>{item.description}</p>
    <button className='priceBtn' onClick={()=>{console.log("second")}}
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
      <div className="trendingProducts">
      {loading && !error ? <img src={loader} style={{width:"120px"}} alt="three dots loading"/>: trendingItems}
      {error && <p style={{color:'red'}}>{error}</p>}
      </div>
    </div>
  )
}

export default Trending
import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import "./home.css";
import loader from "../../assets/loading.svg";
import { baseURL } from '../../../credentials.js';

function Trending() {
  const [trendingProduct,setTrendingProduct] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  useEffect(()=>{
    const getTrendingProducts = async()=>{
      try {  
        const res = await axios.get(`${baseURL}/products?trendingProduct=true`);
        setTrendingProduct(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    getTrendingProducts();
  },[]);
  const trendingItems =trendingProduct && trendingProduct?.map(item=>{
   return (
    <div className="trendingProduct" key={item.id}>
    <img src={item.image} alt="" />
    <h4>{item.title}</h4>
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
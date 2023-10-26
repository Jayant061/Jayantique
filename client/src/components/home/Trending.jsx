import React,{ useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./home.css";
import LazyImage from '../lazyImage/LazyImage';
import loader from "../../assets/loading.svg";
// import loader from "../../assets/loading-loop.svg";
import { baseURL } from '../../../credentials.js';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductsContext';

function Trending() {
  // const [trendingProduct,setTrendingProduct] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const {state,dispatch} = useContext(ProductContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const getTrendingProducts = async()=>{
      try {  
        const res = await axios.get(`${baseURL}/products?trendingProduct=true`);
        // res.status===200 && setTrendingProduct(res.data);
        res.status===200 && dispatch({type:"trendingProducts",payload:res.data});
        setLoading(false);
      } catch (error) {
        setError(error.message);
        const makeReq = setTimeout(()=>{
          getTrendingProducts();
          clearTimeout(makeReq);
        },2000);
        setLoading(false);
      }
    }
    const timeOut = setTimeout(()=>{
      !state.trendingProduct?.length && getTrendingProducts();
      
    },1000);
    return()=>{
      clearTimeout(timeOut);
    }
  },[]);
  useEffect(()=>{
    if(state.trendingProducts?.length){
      setError("");
      setLoading(false);
    }
  },[state]);
  const trendingItems = state.trendingProducts?.length && state.trendingProducts?.map((items,index)=>{
   
    const products = items.map((item)=>{
    return(
      <div className="trendingProduct" key={item.id}>
      <LazyImage src={item.images[0]} alt={`product image`} id={item.id}/>
      <div className="texts" style={index===0?{paddingLeft:"5px"}:{}}>
      <h4 onClick={()=>{navigate(`/product/${item._id}`)}}>{item.title}</h4>
      <p>₹ {item.price}</p>
      </div>
    </div>);
    });
    return (
      <div className="trending" key={index}>
      <div className='trendigSubHeading'>
      {index ===0 && <h3>Men</h3>}
      {index ===1 && <h3>Women</h3>}
      {index ===2 && <h3>Home Decor</h3>}
      </div>
      <div className='trendingProducts'
      style={index===0?{backgroundColor: "#e3e3e377"}:{}}>
      {products}
      </div>
      </div>
    )
  })
  return (
    <div className='trendingPage'>
      <div className="trendingHeading">
      <span>TRENDING</span>
      </div>
      {loading?<img src={loader} alt='loading...' style={{width:"300px"}}/>:<></>}
      {error? <span style={{textAlign:"center",color:"red"}}>{error}</span>:<></>}
      {trendingItems.length?trendingItems:<></>}
    </div>
  )
}

export default Trending
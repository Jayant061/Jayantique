import React,{ useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./home.css";
import LazyImage from '../lazyImage/LazyImage';
// import loader from "../../assets/loading-loop.svg";
import { baseURL } from '../../../credentials.js';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductsContext';
import LoadingSpinner from '../../assets/loadingSpinner/LoadingSpinner';

function Trending() {
  // const [trendingProduct,setTrendingProduct] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [errorCount,setErrorCount] = useState(0);
  const {state,dispatch} = useContext(ProductContext);
  const navigate = useNavigate();
  //Recursive call to get trending products
  useEffect(()=>{
    const getTrendingProducts = async()=>{
      // setLoading(true);

      // base case

      try {  
        const res = await axios.get(`${baseURL}/products?trendingProduct=true`);
        // res.status===200 && setTrendingProduct(res.data);
        res.status===200 && dispatch({type:"trendingProducts",payload:res.data});
        setLoading(false);
      } catch (error) {
        error.code === "ERR_NETWORK"? setError(error.message + "\n Trying to reconnecting the server...")
        :setError(error.message);
        const makeReq = error.code === "ERR_NETWORK" && setTimeout(()=>{
          // console.log(makeReq);
          state.trendingProduct?.length &&  clearTimeout(makeReq); 
          getTrendingProducts();
        },2000);
        state.trendingProduct?.length && setLoading(false);
      }
    }
    const timeOut =!state.trendingProduct?.length &&  setTimeout(()=>{
      
      getTrendingProducts();
      
    },10);
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
        <div className="trendingItemImg" style={{width:"100%",display:"flex",justifyContent:"center"}}>
        {index === 0 && <img src = "men.jpg" alt = "portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-brown-suit-sitting-near-dark" style={{width:"100%"}} />}
        {index === 1 && <img src = "women.jpg" alt = "fashionable-young-model-sitting-on-ground"/>}
        {index=== 2 && <img src = "homeDecoration.jpg" alt = "armchair-green-living-room-with-copy-space"/>}
        </div>
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
      {loading?<LoadingSpinner error = {error} />:<></>}
      {trendingItems.length?trendingItems:<></>}
    </div>
  )
}

export default Trending
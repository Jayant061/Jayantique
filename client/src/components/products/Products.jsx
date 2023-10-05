import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import axios from "axios";
import searchIcon from "../../assets/outline-search.svg";
import sadIcon from "../../assets/sad.svg";
import "./product.css";
import { ProductContext } from "../../context/ProductsContext";
import loader from "../../assets/loading.svg";
import { baseURL, getProducts } from "../../../credentials.js";
import loadingLoop from "../../assets/loading-loop.svg";
const Product = lazy(()=>import("./Product"));

function Products() {
  const {state} = useContext(ProductContext);
  const [query, setQuery] = useState("");
  const { dispatch } = useContext(ProductContext);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
useEffect(()=>{
document.title = "Jayantique | All products"
const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get('query');
    q && setQuery(q);
},[]);
useEffect(()=>{
  const productsRequest = async()=>{
    const newURL= window.location.origin + window.location.pathname + `?query=${query}`;
    if(query){
      window.history.pushState(newURL,"",newURL);
    }
    else{
      const newURL= window.location.origin + window.location.pathname;
      window.history.pushState(newURL,"",newURL);
    }
    try {
      const result = await axios.get(`${baseURL}/products?query=${query}`);
      setLoading(false);
      dispatch({
        type: getProducts,
        payload: result.data,
      });
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  const timeOut = setTimeout(()=>{
    setLoading(true);
    productsRequest();
  },1000);
  return()=>{
    clearTimeout(timeOut);
    setLoading(false);
  }
},[query])
  const items = state.products?.map((product, index) => {

    return (
      <Suspense fallback = {<div><img src={loadingLoop} alt="" /></div>} key={index}><Product product = {product} key={index}/></Suspense>
    );
  });
  
  return (
    <div className="products">
      <div className="productsHeading">
        <h2>All Products</h2>
      </div>
      <div className="searchBar">
        <div className="input">
          <img src={searchIcon} alt="" />
          <input type="text" name="query" id="" placeholder="Search products by name"
          onChange={(e)=>{setQuery(e.target.value);}}/>
        </div>
      </div>
      <div className="items">
        {loading?<img src={loader} style={{width:"120px"}} alt="three dots loading"/>:items}
        {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    </div>
  );
}

export default Products;

import React, { useState, useEffect, useContext, lazy, Suspense, useRef } from "react";
import axios from "axios";
import searchIcon from "../../assets/outline-search.svg";
import "./product.css";
import { ProductContext } from "../../context/ProductsContext";
import loader from "../../assets/loading.svg";
import { baseURL, getProducts } from "../../../credentials.js";
import loadingLoop from "../../assets/loading-loop.svg";
const Product = lazy(()=>import("./Product"));
const Pagination = lazy(()=>import("./Pagination"));

function Products() {
  const {state} = useContext(ProductContext);
  const [query, setQuery] = useState("");
  const [page,setPage] = useState(1);
  const { dispatch } = useContext(ProductContext);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const productRef = useRef();
useEffect(()=>{
document.title = "Jayantique | All products"
const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get("query");
    q && setQuery(q) & setPage(1);
    const p = queryParams.get("page");
    p && setPage(parseInt(p));
    if(!state?.products.length){
      if(q && (state?.products[0]?.title.includes(q) || state?.products[0]?.category.includes(q))){
      }
    }
},[]);
useEffect(()=>{
  if(sessionStorage.getItem("isProductReq") === "false"){
    setLoading(false);
  }
  const productsRequest = async()=>{
    let newURL= window.location.origin + window.location.pathname;
    if(query && page){
      newURL = newURL + `?query=${query}&page=${page}`;
    }
    else if(query){
      newURL = newURL + `?query=${query}`;
    }
    else if(page){
      newURL = newURL + `?page=${page}`;
    }
    else{
       newURL= window.location.origin + window.location.pathname;
    }
    window.history.pushState(newURL,"",newURL);
    try {
      const result = await axios.get(`${baseURL}/products?query=${query}&page=${page}`);
      setLoading(false);
      dispatch({
        type: getProducts,
        payload: result.data,
      });
      sessionStorage.setItem("isProductReq","false");
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  const timeOut = sessionStorage.getItem("isProductReq")==="true" && setTimeout(()=>{
    setLoading(true);
    productsRequest();
  },1000);
  return()=>{
    clearTimeout(timeOut);
    setLoading(false);
  }
},[query,page]);

useEffect(()=>{
  productRef.current?.scrollIntoView({behavior:"smooth"});
},[state])

  const items = state?.products?.map((product, index) => {

    return (
      <Suspense fallback = {<div><img src={loadingLoop} alt="" /></div>} key={index}><Product product = {product} key={index}/></Suspense>
    );
  });
  
  return (
    <div className="products" ref={productRef}>
      <div className="productsHeading">
        <h2>All Products</h2>
      </div>
      <div className="searchBar">
        <div className="input">
          <img src={searchIcon} alt="" />
          <input type="text" name="query" id="" placeholder="Search products by name"
          onChange={(e)=>{setQuery(e.target.value);setPage(1);sessionStorage.setItem("isProductReq","true")}}/>
        </div>
      </div>
      <div className="items">
        {loading?<img src={loader} style={{width:"30%"}} alt="three dots loading"/>:items}
        {error && <p style={{color:'red'}}>{error}</p>}
        </div>
        {state?.products?.length && !loading? <Pagination setPage = {setPage} itemNumber = {state.products.length} isLoading={loading}/>:<></>}
    </div>
  );
}

export default Products;

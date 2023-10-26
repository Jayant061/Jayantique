import React, { useState, useEffect, useContext, lazy, Suspense, useRef } from "react";
import axios from "axios";
import searchIcon from "../../assets/outline-search.svg";
import "./product.css";
import { ProductContext } from "../../context/ProductsContext";
import loader from "../../assets/loading.svg";
import { baseURL, getProducts } from "../../../credentials.js";
import loadingLoop from "../../assets/loading-loop.svg";
import { useNavigate } from "react-router-dom";
const Product = lazy(()=>import("./Product"));
const Pagination = lazy(()=>import("./Pagination"));

function Products() {
  const { dispatch,state } = useContext(ProductContext);
  // const [query, setQuery] = useState("");
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const inputRef = useRef();

  useEffect(()=>{
    document.title = "Jayantique | All products"

    if(!state.products.length){
      sessionStorage.setItem("isProductReq","true");
    }
    // this code is mainly to restore query on refreshing of  web page

    const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get("query");
    q && dispatch({type:"Query",payload:q});
    const p = queryParams.get("page");
    p && setPage(parseInt(p));

},[]);

useEffect(()=>{
// handle state only invoked when user presses back or forward button
  function handleState(){
    const queryParams = new URLSearchParams(window.location.search);
    const p = queryParams.get("page");
    p && setPage(parseInt(p));
    sessionStorage.setItem("isProductReq","true");
  }
  window.addEventListener("popstate",handleState);
  return()=>{
    window.removeEventListener("popstate",handleState);
  }
},[]);

useEffect(()=>{
  const query = state.query
  if(sessionStorage.getItem("isProductReq") === "false"){
    setLoading(false);
  }
  const productsRequest = async()=>{
    try {
      const result = await axios.get(`${baseURL}/products?query=${query}&page=${page}`);
      setLoading(false);
      dispatch({
        type: getProducts,
        payload: result.data,
      });
      sessionStorage.setItem("isProductReq","false");
      
    } catch (error) {
      !state.products?.length && setError(error.message);
      setLoading(false);
      const makereq = setTimeout(()=>{
        productsRequest();
        if(state.product?.length){
          clearTimeout(makereq);
        }
      },2000);
    }
  }
    const timeOut = sessionStorage.getItem("isProductReq")==="true" && setTimeout(()=>{
      !state.products?.length && setLoading(true);
      productsRequest();
    },1000);
  return()=>{
    clearTimeout(timeOut);
    setLoading(false);
  }
},[state.query,page]);

useEffect(()=>{
  const query = state.query;
  inputRef.current?.scrollIntoView({behavior:"smooth",block:"start"});

  let newURL= window.location.origin + window.location.pathname;
  newURL = newURL + `?query=${query}&page=${page}`;
  window.history.pushState(newURL,"",newURL);
  state.products?.length && setError("");
},[state,page]);

  const items = state?.products?.map((product, index) => {

    return (
      <Suspense fallback = {<div><img src={loadingLoop} alt="" /></div>} key={index}><Product product = {product} key={index}/></Suspense>
    );
  });
  
  return (
    <div className="products">
      <div className="productsHeading">
        <span ref={inputRef}>All Products</span>
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

import React, { useState, useEffect, useContext, lazy, Suspense, useRef } from "react";
import axios from "axios";
import "./product.css";
import filterIcon from "../../assets/filter.svg";
import { ProductContext } from "../../context/ProductsContext";
import { baseURL, getProducts } from "../../../credentials.js";
import LoadingSpinner from "../../assets/loadingSpinner/LoadingSpinner";
import Filter from "./filters/Filter";
const Product = lazy(()=>import("./Product"));
const Pagination = lazy(()=>import("./Pagination"));

function Products() {
  const { dispatch,state } = useContext(ProductContext);
  // const [query, setQuery] = useState("");
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [isFilterVisible,setIsFilterVisible] = useState(false);
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
    setIsFilterVisible(false);
    const timeOut = sessionStorage.getItem("isProductReq")==="true" && setTimeout(()=>{
      setLoading(true);
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
    <Suspense fallback = {<LoadingSpinner/>} key={index}><Product product = {product} key={index}/></Suspense>
    );
  });
  

  return (
    <div className="products">
      <div className="productsHeading" ref={inputRef}>
        <span >All Products</span>
      </div>
      <div className="filtersAndSort">
        
      </div>
      <div className="items">
      <div className="filterIcon" onClick={()=>{setIsFilterVisible(prev=>{return !prev})}}>
        <img src={filterIcon} alt="" style={isFilterVisible?{transform :"rotate(180deg)"}:{}} />
        </div>
        {items.length ? <Filter isFilterVisible = {isFilterVisible} />:<></>}
        {loading?<LoadingSpinner/>:items}
        {error && <p style={{color:'red'}}>{error}</p>}
        </div>
        {state?.products?.length && !loading? <Pagination setPage = {setPage} itemNumber = {state.products.length} isLoading={loading}/>:<></>}
    </div>
  );
}

export default Products;

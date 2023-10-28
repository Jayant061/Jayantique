import React, { useState, useEffect, useContext, lazy, Suspense, useRef } from "react";
import axios from "axios";
import "./product.css";
import filterIcon from "../../assets/filter.svg";
import { ProductContext } from "../../context/ProductsContext";
import { baseURL, getProducts } from "../../../credentials.js";
import LoadingSpinner from "../../assets/loadingSpinner/LoadingSpinner";
import Filter from "./filters/Filter";
import { URLContext } from "../../context/URLContext";
const Product = lazy(()=>import("./Product"));
const Pagination = lazy(()=>import("./Pagination"));

function Products() {
  const { dispatch,state } = useContext(ProductContext);
  const {URLState} = useContext(URLContext);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [isFilterVisible,setIsFilterVisible] = useState(false);
  const inputRef = useRef();

  useEffect(()=>{
    document.title = "Jayantique | All products"
    // this code is mainly to restore query on refreshing of  web page
},[]);
useEffect(()=>{
  setError("");
},[state]);
useEffect(()=>{
  const productsRequest = async()=>{
    try {
      const result = await axios.get(`${baseURL}/products${window.location.search}`);
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
    const timeOut = sessionStorage.getItem("isProductReq") === "true" && setTimeout(()=>{
      setLoading(true);
      productsRequest();
    },1000);
  return()=>{
    clearTimeout(timeOut);
    setLoading(false);
  }
},[URLState,URLState]);

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
        {((!state?.products?.length &&(URLState.gender || URLState.category)) || state?.products?.length) ? <Filter isFilterVisible = {isFilterVisible} />:<></>}
        {loading?<LoadingSpinner/>:items}
        {error && <p style={{color:'red'}}>{error}</p>}
        </div>
        {!loading? <Pagination itemNumber = {state.products.length} isLoading={loading}/>:<></>}
    </div>
  );
}

export default Products;

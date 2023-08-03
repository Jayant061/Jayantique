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
},[]);
useEffect(()=>{
  const getProductItems = async ()=>{
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
  if(!query?.length || query.length>2){
    setLoading(true);
    getProductItems();
  }
},[query])
  const items = state.products?.map((product, index) => {

    return (
      <Suspense fallback = {<div>loading...</div>} key={index}><Product product = {product} key={index}/></Suspense>
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
        {(items?.length === 0 && loading === false && !error)&& <div className="notFound">
          <span>We apologize, but we couldn't locate 
        the exact product you were searching for. Our inventory is constantly being 
        updated, so we recommend checking back later or exploring our new 
        or trending products.</span>
        <img src={sadIcon} alt="" />
        
        </div>}
        </div>
    </div>
  );
}

export default Products;

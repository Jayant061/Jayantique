import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
// import rightArr from "../../assets/rightArr.svg";
import LazyImage from "../lazyImage/LazyImage";
import { ProductContext } from "../../context/ProductsContext";
const Trending = lazy(() => import("./Trending.jsx"));
const Testimonial = lazy(() => import("./Testimonial"));

function Home() {
  const { state } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentSuccess = queryParams.get("paymentSuccess");
  const paymentCancel = queryParams.get("paymentCancel");
  const transactionError = queryParams.get("transactionError");
  useEffect(() => {
    document.title = "Jayantique | Home";
    paymentSuccess && navigate("/payment/success");
    paymentCancel && navigate("/payment/cancel");
    transactionError && navigate("/payment/error");
  }, []);
  function setProductReq(){
    if(state?.products?.length !==0){
      if(state.products[0].category.includes("watch")){
        sessionStorage.setItem("isProductReq","false");
      }else{
        sessionStorage.setItem("isProductReq","true");
      }
    }else{
      sessionStorage.setItem("isProductReq","true");
    }
  }
  return (
    <div className="home">
      <div className="homeHeader">
        
        {/* <img src= alt="" /> */}
        <div className="text">
          <h1>
            Give your Fashion a new Style
          </h1>
          <p >
            Explore our curated selection of high-quality products and shop for
            your favorite items from the comfort of your home
          </p>
          <button
          onClick={()=>{
            setProductReq();
            navigate("/products?query=watch")}}>
            Shop Now &#10132;
          </button>
        </div>
        <LazyImage src = {`homepage2.png`} alt={`background image`} id={`bgimg`}/>
      </div>
      {/* {state.products && ( */}
        
          <Suspense fallback={<div>loading...</div>}>
          <Trending />
        </Suspense>
      {/* )} */}
      <Suspense fallback={<div>loading...</div>}>
        <Testimonial />
      </Suspense>
    </div>
  );
}

export default Home;

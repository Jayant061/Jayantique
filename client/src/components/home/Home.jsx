import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import LazyImage from "../lazyImage/LazyImage";
import { ProductContext } from "../../context/ProductsContext";
const Trending = lazy(() => import("./Trending.jsx"));
const Testimonial = lazy(() => import("./Testimonial"));

function Home() {
  const [homePageAnimation,setHomePageAnimation] = useState(false);
  const { state } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentSuccess = queryParams.get("paymentSuccess");
  const paymentCancel = queryParams.get("paymentCancel");
  const transactionError = queryParams.get("transactionError");
  useEffect(() => {
    document.title = "Jayantique | Home";
    // paymentSuccess && navigate("/payment/success");
    // paymentCancel && navigate("/payment/cancel");
    // transactionError && navigate("/payment/error");
    return()=>{setHomePageAnimation(false)}
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
  function onLoad(){
    setHomePageAnimation(true);
  }
  return (
    <div className="home">
      <div className="homeHeader">
        <div className="text">
          <h1 style={homePageAnimation?{animation:"slideIn 1s ease 0.1s forwards"}:{}}>
            {/* Your Perfect Home Starts Here */}
            Design Your Signature Space
          </h1>
          <p style={homePageAnimation?{animation:"slideIn 1s ease 0.2s forwards"}:{}}>
            Explore Exquisite Fashion and Home Decor Choices to Redefine Your Space with Elegance.
          </p>
          <button
          style={homePageAnimation?{animation:"slideIn 1s ease 0.35s forwards"}:{}}
          onClick={()=>{
            setProductReq();
            navigate("/products?query=women perfume")}}>
            Shop Now &#10132;
          </button>
        </div>
        <div className="homeImg">
        <img src = {
          `https://firebasestorage.googleapis.com/v0/b/ecommerce-app-7604d.appspot.com/o/JayantiqueHomepage.png?alt=media&token=ba006548-b59b-4d1b-985a-8d84da113844&_gl=1*1r4cqd0*_ga*NTYzODcyMjgwLjE2ODU1OTE4MzA.*_ga_CW55HF8NVT*MTY5ODE1NzU3Mi4zLjEuMTY5ODE1NzY4NC4xMS4wLjA.`
        // "shopping.png"
        } alt={`background image`} id={`bgimg`} onLoad={onLoad}/>
        </div>
      </div>
        
          <Suspense fallback={<div>loading...</div>}>
          <Trending />
        </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <Testimonial />
      </Suspense>
    </div>
  );
}

export default Home;

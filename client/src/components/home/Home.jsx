import React, { Suspense, lazy, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import LoadingSpinner from "../../assets/loadingSpinner/LoadingSpinner";
import { ProductContext } from "../../context/ProductsContext";
import { URLContext } from "../../context/URLContext";
const Trending = lazy(() => import("./Trending.jsx"));
const Testimonial = lazy(() => import("./Testimonial"));

function Home() {
  const [homePageAnimation,setHomePageAnimation] = useState(false);
  const { state } = useContext(ProductContext);
  const {URLDispatch} = useContext(URLContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Jayantique | Home";
    return()=>{setHomePageAnimation(false)}
  }, [state]);
  function setProductReq(){
    URLDispatch({
      type:"query",
      payload:"women perfume"
    })
    if(state?.products?.length !==0){
      if(state.products[0].category.includes("women perfume")){
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
            navigate("/products")}}>
            Shop Now &#10132;
          </button>
        </div>
        <div className="homeImg">
          {/*left right #D9DFDB,#E9EFED */}
        <img src = {
          `https://firebasestorage.googleapis.com/v0/b/ecommerce-app-7604d.appspot.com/o/JayantiqueHomepage.png?alt=media&token=ba006548-b59b-4d1b-985a-8d84da113844&_gl=1*1r4cqd0*_ga*NTYzODcyMjgwLjE2ODU1OTE4MzA.*_ga_CW55HF8NVT*MTY5ODE1NzU3Mi4zLjEuMTY5ODE1NzY4NC4xMS4wLjA.`
        // "homepage.png"
        } alt={`background image`} id={`bgimg`} onLoad={onLoad}/>
        </div>
      </div>
          <Suspense fallback={<LoadingSpinner/>}>
          <Trending />
        </Suspense>
      <Suspense fallback={<LoadingSpinner/>}>
        <Testimonial />
      </Suspense>
    </div>
  );
}

export default Home;

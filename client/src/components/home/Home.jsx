import React, { useContext, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import Trending from "./Trending.jsx";
import bgimage from "../../assets/image1.png";
import { ProductContext } from "../../context/ProductsContext";
import Testimonial from "./Testimonial";

function Home() {
  const {state} = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentSuccess = queryParams.get("paymentSuccess");
  const paymentCancel = queryParams.get("paymentCancel");
  useEffect(()=>{
    document.title = "Jayantique | Home";
    console.log(paymentCancel,paymentSuccess);
    paymentSuccess && navigate("/payment/success");
    paymentCancel && navigate("/payment/cancel");
},[])
  return (
    <div className="home">
      <div className="homeHeader">
        <div className="text">
          <h4>Up to 25% off on your first order.</h4>
          <div className="para">
          <p>Discount is automatically applied.</p>
          <p>No code required.</p>
            <p>Cannot be combined with other offers.</p>
          </div>
          <button onClick={()=>{navigate("/products")}}>Shop Now &#x2192;</button>
        </div>
        <div className="bgimage">
          <img src={bgimage} alt="" />
        </div>
      </div>
      {state.products && <Trending/>}
      <Testimonial/>
    </div>
  );
}

export default Home;

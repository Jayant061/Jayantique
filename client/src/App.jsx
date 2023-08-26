import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { getUser } from "../credentials";
import "./App.css";
import { UserContext } from "./context/UserContext";

// import Home from "./components/home/Home";
const Home = lazy(()=>import("./components/home/Home"));
const Products = lazy(()=>import("./components/products/Products"));
const Navbar = lazy(()=>import("./components/navbar/Navbar"));
const ProductDescription = lazy(()=>import("./components/products/ProductDescription"));
const Register = lazy(()=>import("./components/loginNRegister/Register"));
const Login = lazy(()=>import("./components/loginNRegister/Login"));
const User = lazy(()=>import("./components/user/User"));
const Cart = lazy(()=>import("./components/addToCart/Cart"));
const PaymentDetails = lazy(()=>import("./components/checkout/PaymentDetails"));
const Success = lazy(()=>import("./components/checkout/Success"));
const Cancel = lazy(()=>import("./components/checkout/Cancel")) ;
const Error = lazy(()=>import("./components/checkout/Error"));
const Footer = lazy(()=>import("./components/footer/Footer"));
const AboutUs = lazy(()=>import("./components/usefulPages/aboutUs/AboutUs"));
const PrivacyPolicy = lazy(()=>import("./components/usefulPages/privacy-policy/PrivacyPolicy"))
const TermsConditions = lazy(()=>import("./components/usefulPages/termsConditions/TermsConditions"));
// import Footer from "./components/footer/Footer";

function App() {
  const {userDispatch} = useContext(UserContext);
  const accessToken = localStorage.getItem("accessToken")
  const ProtectedRoute = ({children})=>{
    const location = useLocation();
  const accessToken = localStorage.getItem("accessToken")
    if(accessToken){
      try {
        const data = jwt_decode(accessToken);
        if(data){
          return( children );
        }
      } catch (error) {
        return(<Navigate to={"/login"} state={{from: location}} replace/>);
      }
    }
  return(<Navigate to={"/login"} state={{from: location}} replace/>)
  }
  useEffect(() => {
    let subs = true;
    const getData = async () => {
      if(accessToken){
        try {
          const data = jwt_decode(accessToken);
          if(data){
            userDispatch({
              type:getUser,
              payload:data?.resData
            });
          }  
        } catch (error) {
        }
      }
    };
    subs && getData();
    return () => {
      subs = false;
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Suspense fallback = {<div>Loading...</div>}><Home /></Suspense>} />
          <Route exact path="/products" element={<Suspense fallback = {<div>Loading...</div>}><Products /></Suspense>} />
          <Route exact path= "/product/:params" element={<Suspense fallback = {<div>Loading...</div>}><ProductDescription /></Suspense>} />
          <Route exact path="/register" element = {<Suspense fallback = {<div>Loading...</div>}><Register/></Suspense>}/>
          <Route exact path="/login" element = {<Suspense fallback = {<div>Loading...</div>}><Login/></Suspense>}/>
          <Route exact path="/auth/user" element = {<ProtectedRoute><Suspense fallback = {<div>Loading...</div>}><User/></Suspense></ProtectedRoute>}/>
          <Route exact path="/addToCart" element = {<Suspense fallback = {<div>Loading...</div>}><Cart/></Suspense>}/>
          <Route exact path="/checkout" element = {<ProtectedRoute><Suspense fallback = {<div>Loading...</div>}><PaymentDetails/></Suspense></ProtectedRoute>}/>
          <Route exact path="/payment/success" element = {<Suspense fallback = {<div>Loading...</div>}><Success/></Suspense>}/>
          <Route exact path="/payment/cancel" element = {<Suspense fallback = {<div>Loading...</div>}><Cancel/></Suspense>}/>
          <Route exact path="/payment/error" element = {<Suspense fallback = {<div>Loading...</div>}><Error/></Suspense>}/>
          <Route exact path="/about-us" element = {<Suspense fallback = {<div>Loading...</div>}><AboutUs/></Suspense>}/>
          <Route exact path="/privacy-policy" element = {<Suspense fallback = {<div>Loading...</div>}><PrivacyPolicy/></Suspense>}/>
          <Route exact path="/tnc" element = {<Suspense fallback = {<div>Loading...</div>}><TermsConditions/></Suspense>}/>

        </Routes>
        <Suspense fallback = {<div>Loading...</div>}><Footer/></Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

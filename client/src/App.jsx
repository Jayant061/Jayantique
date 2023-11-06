import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { getUser } from "../credentials";
import "./App.css";
import { UserContext } from "./context/UserContext";
import LoadingSpinner from "./assets/loadingSpinner/LoadingSpinner";
import { URLContext } from "./context/URLContext";

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
    sessionStorage.setItem("isProductReq","true");
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
  const [state,setState] = useState(0);
  const {URLState} = useContext(URLContext);
  useEffect(()=>{
    function changeURL(){
      let newURL= window.location.origin + window.location.pathname;
      newURL = newURL + `?${URLState.query?"query="+URLState.query + "&":""}${URLState.gender?"gender="+URLState.gender  + "&":""}${URLState.category?"category="+URLState.category + "&":""}${URLState.sort?"sort="+URLState.sort   + "&":""}${URLState.page?"page="+URLState.page:""}`
      window.history.pushState(newURL,"",newURL);
    }
    if(state === 0){
      setState(1);
    }
    else{
      changeURL();
    }
  },[URLState]);
  return (
    <div className="app">
      <BrowserRouter>
        <div className="head">
        <Suspense fallback={<LoadingSpinner/>}><Navbar /></Suspense>
        </div>

        <div className="main">
        <Routes>
          <Route exact path="/" element={<Suspense fallback = {<LoadingSpinner/>}><Home /></Suspense>} />
          <Route exact path="/products" element={<Suspense fallback = {<LoadingSpinner/>}><Products /></Suspense>} />
          <Route exact path= "/product/:params" element={<Suspense fallback = {<LoadingSpinner/>}><ProductDescription /></Suspense>} />
          <Route exact path="/register" element = {<Suspense fallback = {<LoadingSpinner/>}><Register/></Suspense>}/>
          <Route exact path="/login" element = {<Suspense fallback = {<LoadingSpinner/>}><Login/></Suspense>}/>
          <Route path="/auth/user/*" element = {<ProtectedRoute><Suspense fallback = {<LoadingSpinner/>}><User/></Suspense></ProtectedRoute>}></Route>
          <Route exact path="/addToCart" element = {<Suspense fallback = {<LoadingSpinner/>}><Cart/></Suspense>}/>
          <Route exact path="/checkout" element = {<ProtectedRoute><Suspense fallback = {<LoadingSpinner/>}><PaymentDetails/></Suspense></ProtectedRoute>}/>
          <Route exact path="/payment/success" element = {<Suspense fallback = {<LoadingSpinner/>}><Success/></Suspense>}/>
          <Route exact path="/payment/cancel" element = {<Suspense fallback = {<LoadingSpinner/>}><Cancel/></Suspense>}/>
          <Route exact path="/payment/error" element = {<Suspense fallback = {<LoadingSpinner/>}><Error/></Suspense>}/>
          <Route exact path="/about-us" element = {<Suspense fallback = {<LoadingSpinner/>}><AboutUs/></Suspense>}/>
          <Route exact path="/privacy-policy" element = {<Suspense fallback = {<LoadingSpinner/>}><PrivacyPolicy/></Suspense>}/>
          <Route exact path="/tnc" element = {<Suspense fallback = {<LoadingSpinner/>}><TermsConditions/></Suspense>}/>
        </Routes>
        </div>
        <div className="mainFooter">  
        <Suspense fallback = {<LoadingSpinner/>}><Footer/></Suspense>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

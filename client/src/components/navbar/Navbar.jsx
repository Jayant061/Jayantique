import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import userIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart.svg";
import moreIcon from "../../assets/more.svg";
import searchIcon from "../../assets/outline-search.svg";
import "./navbar.css";
import { CartContext } from "../../context/CartContext";
import { URLContext } from "../../context/URLContext";

export default function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSeeMore, setSeeMore] = useState(false);
  const { quantity } = useContext(CartContext);
  const {URLState, URLDispatch} = useContext(URLContext);
  // const q =  (new URLSearchParams(window.location.search)).get("query")
  // const [initialState]
  const [query,setQuery] = useState(URLState.query?URLState?.query:"");
  useEffect(() => {
    setSeeMore(false);
  }, [location.pathname]);
  useEffect(() => {
    sessionStorage.setItem("isProductReq","true");
    document.addEventListener("mousedown", (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setSeeMore(false);
      }
    });
    return () => {
      document.removeEventListener("mousedown", (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
          setSeeMore(false);
        }
      });
    };
  }, []);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if(currentScrollPos>=50){
        setScrollingDown(currentScrollPos > prevScrollPos);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const navbarStyle = {
    transform: scrollingDown ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 0.3s ease-in-out',
  };
  useEffect(()=>{
    if(query === URLState.query){
      
      sessionStorage.setItem("isProductReq","false");
    }
    else{
      sessionStorage.setItem("isProductReq","true");
    }
    const timeOut = setTimeout(()=>{
      if(URLState.query !== query){
         URLDispatch({
        type:"query",
        payload:query
      });
      URLDispatch({
        type:"gender",
        payload:""
      });
      URLDispatch({
        type:"category",
        payload:""
      })

    }
    },1000);
    return()=>{clearTimeout(timeOut)}
  },[query]);
  const [initial,setInitial] = useState(0);
  useEffect(()=>{
    sessionStorage.setItem("isProductReq","true");
    if(initial === 0){
      setInitial(1);
    }
    else{
      if(window.location.pathname !=="/products"){
        navigate(`/products`);
      }
    }
  },[URLState])
  function handleChange(e){
    setQuery(e.target.value);
    setScrollingDown(false);
  }

  return (
    <>
      <div className="navbar" 
      style={navbarStyle}
      >
        <div
          className="logo"
          
        >
          <span onClick={() => {
            navigate("/");
            setSeeMore(false);
          }}>Jayantique</span>
        </div>
        {!isSeeMore && (
          <img
            src={moreIcon}
            alt="button for more options"
            className="moreBtn"
            style={isSeeMore ? { backgroundColor: "#f1f1f1" } : {}}
            onClick={() => {
              setSeeMore((prev) => {
                return !prev;
              });
            }}
          />
        )}
          <div className="navSearchBar">
          <img src={searchIcon} alt="search Icon"/>
          <input type="text" placeholder="Search product by name, category etc." value={query}
          onChange={handleChange} />
          </div>
        <ul
          className="navItems"
          style={isSeeMore ? { display:"flex", height:"max-content" } : {}}
          ref={navRef}
        >
          {/* <li  style={firstElStyle}> */}

          {/* </li> */}
          <li id="firstEl">
            <Link to="/auth/user">
              <img src={userIcon} alt="" />
            </Link>
          </li>
          <li>
            <Link to="/addToCart">
              <div id="cart" style={divStyles}>
                <span style={quantity ? spanStyle : { display: "none" }}>
                  {quantity}
                </span>
                <img src={cartIcon} alt="" />
              </div>
            </Link>
          </li>
        </ul>
        </div>
    </>
  );
}
const divStyles = {
  position: "relative",
};
const spanStyle = {
  minWidth: "fit-content",
  textDecoration: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  fontWeight: "500",
  fontSize: "15px",
  zindex: "10",
  color: "#13395b",
};

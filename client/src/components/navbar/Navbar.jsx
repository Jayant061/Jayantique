import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import userIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart2.svg";
import moreIcon from "../../assets/more.svg";
import searchIcon from "../../assets/outline-search.svg";
import "./navbar.css";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductsContext";

export default function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSeeMore, setSeeMore] = useState(false);
  const { quantity } = useContext(CartContext);
  const [SearchBarvisibility, setSearchBarvisibility] = useState(false);
  const [query,setQuery] = useState("");
  const {state,dispatch} = useContext(ProductContext);
  useEffect(() => {
    setSeeMore(false);
  }, [location.pathname]);

  useEffect(() => {
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
      if(currentScrollPos>=30){
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
    if(query === state.query){
      
      sessionStorage.setItem("isProductReq","false");
    }
    else{
      sessionStorage.setItem("isProductReq","true");
    }
    const timeOut = query && setTimeout(()=>{
      (query && state.query !== query) && dispatch({
        type:"Query",
        payload:query
      });
    if(window.location.pathname !=="/products"){
      navigate(`/products?query=${query}&page=1`);
    }
    else{

      let newURL= window.location.origin + window.location.pathname;
      newURL = newURL + `?query=${query}&page=1`;
      window.history.pushState(newURL,"",newURL);
    }
    },1000);
    return()=>{clearTimeout(timeOut)}
  },[query]);
  function handleChange(e){
    setQuery(e.target.value);
  }

  return (
    <>
      <div className="navbar" 
      style={navbarStyle}
      >
        <div
          className="logo"
          onClick={() => {
            navigate("/");
            setSeeMore(false);
          }}
        >
          <span>Jayantique</span>
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
          style={isSeeMore ? { height: "fit-content" } : {}}
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
  top: "2px",
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: "500",
  fontSize: "15px",
  zindex: "10",
  color: "#fff",
};

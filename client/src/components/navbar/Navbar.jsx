import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate,Link, useLocation } from "react-router-dom";
import userIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart2.svg";
import moreIcon from "../../assets/more.svg";
import "./navbar.css"
import { CartContext } from "../../context/CartContext";

export default function Navbar(){
    const navRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate();
    const [isSeeMore,setSeeMore] = useState(false);
    const {quantity} = useContext(CartContext);
    const [firstElStyle,setFirstElStyle] = useState({});
    useEffect(()=>{
        setSeeMore(false);
    },[location.pathname]);
    useEffect(()=>{
        document.addEventListener("mousedown",(e)=>{
                if (navRef.current && !navRef.current.contains(e.target)) {
                  setSeeMore(false);
                }
            });
    },[]);
    return(
    <div className="navbar">
        <div className="logo" onClick={()=>{navigate("/");setSeeMore(false)}}>
            <span>Jayantique</span>
        </div>
        {!isSeeMore && <img src={moreIcon} alt="button for more options" className="moreBtn"
        style={isSeeMore?{backgroundColor:"#f1f1f1"}:{}}
        onClick={()=>{setSeeMore(prev=>{return !prev});
        if(window.innerWidth<=480){
            setFirstElStyle({paddingTop:"20px"})
        }}}/>}
        <ul className="navItems" style={isSeeMore ? {height:"fit-content"}:{}} ref={navRef}>
             <li id="firstEl" style={firstElStyle}>
                <Link to='/products' style={{textDecoration:"none"}}><p>Products</p></Link>
                </li>
             <li>
             <Link to='/auth/user'><img src={userIcon} alt=""/></Link>
             </li>
             <li>
            <Link to='/addToCart'><div id="cart" style={divStyles}>
            <span style={quantity? spanStyle :{display:"none"}}>{quantity}</span>
            <img src={cartIcon} alt="" />
            </div></Link>
             </li>
        </ul>
    </div>
    )
}
const divStyles = {
    position:"relative",
}
const spanStyle = {
    minWidth:"fit-content",
    textDecoration:"none",
    position:"absolute",
    top:"2px",
    left:"50%",
    transform:"translateX(-50%)",
    fontWeight:"500",
    fontSize:"15px",
    zindex:"10",
    color:"#fff",
}
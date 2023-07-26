import React, { useContext, useEffect, useState } from "react";
import { useNavigate,Link, useLocation } from "react-router-dom";
import userIcon from "../../assets/user.svg";
import cartIcon from "../../assets/cart2.svg";
import moreIcon from "../../assets/more.svg";
import "./navbar.css"
import { CartContext } from "../../context/CartContext";

export default function Navbar(){
    const location = useLocation()
    const navigate = useNavigate();
    const [isSeeMore,setSeeMore] = useState(false);
    const {quantity} = useContext(CartContext);
    useEffect(()=>{
        setSeeMore(false);
    },[location.pathname])
    return(
    <div className="navbar">
        <div className="logo" onClick={()=>{navigate("/");setSeeMore(false)}}>
            <span>Jayantique</span>
        </div>
        <img src={moreIcon} alt="button for more options" className="moreBtn"
        style={isSeeMore?{backgroundColor:"#f1f1f1"}:{}}
        onClick={()=>{setSeeMore(prev=>{return !prev})}}/>
        <ul className="navItems" style={isSeeMore ? {height:"auto"}:{}}>
             <li id="firstEl">
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
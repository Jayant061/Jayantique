import React, { useEffect, useState } from "react";
import { useNavigate,Link, useLocation } from "react-router-dom";
import userIcon from "../../assets/user.svg";
import cartIcon from "../../assets/shopping-cart-outline.svg";
import moreIcon from "../../assets/more.svg";
import "./navbar.css"

export default function Navbar(){
    const location = useLocation()
    const navigate = useNavigate();
    const [isSeeMore,setSeeMore] = useState(false);
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
            <Link to='/addToCart'><img src={cartIcon} alt="" /></Link>
             </li>
        </ul>
    </div>
    )
}
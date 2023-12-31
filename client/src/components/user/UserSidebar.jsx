import React, { useContext, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import "./userStyles.css";
import userIcon from "../../assets/user.svg"
import walletIcon from "../../assets/wallet.svg"
import orderIcon from "../../assets/order.svg";
import logoutIcon from "../../assets/logout.svg";
import femaleIcon from "../../assets/female.svg";
import moreIcon from "../../assets/moreV.svg";
import addressBook from "../../assets/notebook.svg";
import { logOut, refPane } from '../../../credentials.js';


function UserSidebar() {
    const {currentUser,userDispatch} = useContext(UserContext);
    const [seeMore,setSeeMore] = useState(false);
    const sidebarRef = useRef();
    const pane = sessionStorage.getItem("userPane");
    const [activePane,setActivePane] = useState(pane?pane:"personalInfo");

    function handleLogOut () {
    localStorage.clear();
    userDispatch({
      type:logOut,
      payload:{}
    })
    return(<Navigate to='/auth/user'/>);
  }
  const navigate = useNavigate();

  useEffect(()=>{
    setSeeMore(false);
    sessionStorage.setItem("userPane",activePane);
    navigate("/auth/user/" + activePane);
  },[activePane]);

  useEffect(()=>{
    document.addEventListener("mousedown",(e)=>{
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSeeMore(false);
    }
  });
  return()=>{
    document.removeEventListener("mousedown",(e)=>{
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSeeMore(false);
      }
    })
  }
  },[])

  return (
    <div className='userSidebar'>
        <div className="userHeading">
            {!seeMore && <img src={moreIcon} alt="more options" className='moreIcon'
            style={seeMore?{}:{backgroundColor:'white'}}
            // onMouseDown={()=>{setSeeMore(prev=>{return !prev})}}
            onClick={()=>{setSeeMore(prev=>{return !prev});}}
            />}
            <img src={currentUser.img || currentUser.gender==="Male"? userIcon:femaleIcon} alt="" />
            <div className="usertext">
                <p>Hello,</p>
            <h2>{currentUser.name}</h2>
            </div>
        </div>
        <div className="mainMenu" style={seeMore?{display:"flex"}:{}} ref={sidebarRef}>

            <div className="accSetting" 
            style={activePane === "personalInfo"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("personalInfo")}}>
            <img src={userIcon} alt="" />
            <h4>Account</h4>
            </div>

            <div className="addresses-el" 
            style={activePane === "addresses"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("addresses")}}>
            <img src={addressBook} alt="" />
            <h4>Adresses</h4>
            </div>

            <div className="order"
            style={activePane === "orders"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("orders")}}>
                <img src={orderIcon} alt="" />
            <h4>Orders</h4>
            </div>

            <div className='payment'
            style={activePane === "payments"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("payments")}}>
            <img src={walletIcon} alt="" />
            <h4>Payments</h4>
            </div>

            <div className="logout" onClick={handleLogOut}>
            <img src={logoutIcon} alt="" />
            <h4>Logout</h4>
            </div>
        </div>
    </div>
  )
}

export default UserSidebar
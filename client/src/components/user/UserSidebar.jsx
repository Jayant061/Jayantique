import React, { useContext, useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import "./userStyles.css";
import userIcon from "../../assets/user.svg"
import walletIcon from "../../assets/wallet.svg"
import orderIcon from "../../assets/order.svg";
import logoutIcon from "../../assets/logout.svg";
import femaleIcon from "../../assets/female.svg";
import moreIcon from "../../assets/moreV.svg";
import { logOut } from '../../credentials';


function UserSidebar({setPane}) {
    const {currentUser,userDispatch} = useContext(UserContext);
    const [seeMore,setSeeMore] = useState(false);
    const ref = useRef();

    const [activePane,setActivePane] = useState("Account Settings");
    useEffect(()=>{
      setPane(activePane);
    },[activePane]);
    function handleLogOut () {
    localStorage.clear();
    userDispatch({
      type:logOut,
      payload:{}
    })
    return(<Navigate to='/auth/user'/>);
  }
  return (
    <div className='userSidebar'>
        <div className="userHeading">
            <img src={moreIcon} alt="more options" className='moreIcon'
            style={seeMore?{}:{backgroundColor:'white'}} 
            ref={ref}
            onClick={()=>{setSeeMore(prev=>{return !prev});}}/>
            <img src={currentUser.img || currentUser.gender==="Male"? userIcon:femaleIcon} alt="" />
            <div className="usertext">
                <p>Hello,</p>
            <h2>{currentUser.name}</h2>
            </div>
        </div>
        <div className="mainMenu" style={seeMore?{display:"flex"}:{}}>

            <div className="accSetting" 
            style={activePane === "Account Settings"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("Account Settings")}}>
            <img src={userIcon} alt="" />
            <h4>Account Settings</h4>
            </div>

            <div className="order"
            style={activePane === "My Orders"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("My Orders")}}>
                <img src={orderIcon} alt="" />
            <h4>My Orders</h4>
            </div>

            <div className='payment'
            style={activePane === "Payments"?{backgroundColor:"#13395b0c",cursor:"default"}:{}}
            onClick={()=>{setActivePane("Payments")}}>
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
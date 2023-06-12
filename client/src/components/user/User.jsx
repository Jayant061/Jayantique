import React, { useEffect, useState } from 'react'
import UserSidebar from './UserSidebar';
import UserContent from './UserContent';
import "./userStyles.css";

function User() {
  const[activePane,setActivePane] = useState("");

  useEffect(()=>{
    document.title = "My Account";
  },[]);
  return (
    <>
      <div className='user'>
        <UserSidebar setPane = {setActivePane} />
        <UserContent activePane = {activePane}/>
    </div>
    </>
  )
}

export default User
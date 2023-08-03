import React, { Suspense, lazy, useEffect, useState } from 'react'
const UserSidebar = lazy(()=>import('./UserSidebar'));
const UserContent = lazy(()=>import('./UserContent'));
import "./userStyles.css";

function User() {
  const[activePane,setActivePane] = useState("");

  useEffect(()=>{
    document.title = "My Account";
  },[]);
  return (
    <>
      <div className='user'>
        <Suspense fallback = {<div>loading...</div>}><UserSidebar setPane = {setActivePane} /></Suspense>
        <Suspense fallback = {<div>loading...</div>}><UserContent activePane = {activePane}/></Suspense>
    </div>
    </>
  )
}

export default User
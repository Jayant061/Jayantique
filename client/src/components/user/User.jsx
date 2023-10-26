import React, { Suspense, lazy, useEffect, useState } from 'react'
const UserSidebar = lazy(()=>import('./UserSidebar'));
const UserContent = lazy(()=>import('./UserContent'));
import "./userStyles.css";
import LoadingSpinner from '../../assets/loadingSpinner/LoadingSpinner';

function User() {
  const[activePane,setActivePane] = useState("");

  useEffect(()=>{
    document.title = "My Account";
  },[]);
  return (
    <>
      <div className='user'>
        <Suspense fallback = {<LoadingSpinner/>}><UserSidebar setPane = {setActivePane} /></Suspense>
        <Suspense fallback = {<LoadingSpinner/>}><UserContent activePane = {activePane}/></Suspense>
    </div>
    </>
  )
}

export default User
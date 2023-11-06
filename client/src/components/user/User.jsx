import React, { Suspense, lazy, useEffect, useState } from 'react'
const UserSidebar = lazy(()=>import('./UserSidebar'));
const UserContent = lazy(()=>import('./UserContent'));
import "./userStyles.css";
import LoadingSpinner from '../../assets/loadingSpinner/LoadingSpinner';

function User() {
  
  useEffect(()=>{
    document.title = "My Account";
  },[]);
  return (
    <>
      <div className='user'>
        <Suspense fallback = {<LoadingSpinner/>}><UserSidebar /></Suspense>
        <Suspense fallback = {<LoadingSpinner/>}><UserContent /></Suspense>
    </div>
    </>
  )
}

export default User
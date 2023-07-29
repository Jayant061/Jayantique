import React, { useEffect } from 'react'
import { homeURL } from '../../../credentials.js';

function Success() {
  useEffect(() => {
    const timeout = setTimeout(()=>{
      window.location.href = homeURL;
    },[4000]);
  
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  return (
    <div><h2>Payment Successfull!</h2>
    <h2>Please wait while we redirect you to home page...</h2></div>
  )
}

export default Success
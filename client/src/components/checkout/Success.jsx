import React, { useEffect } from 'react'
import { homeURL } from '../../credentials';

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
    <h2>you will be rediected to homepage within  5 seconds...</h2></div>
  )
}

export default Success
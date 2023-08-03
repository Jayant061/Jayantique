import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(()=>{
      navigate("/");
    },[4000]);
  
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  const divStyle = {
    marginTop:"50px",
    display:"flex",
    flexDirection:"Column",
    alignItems:"center",
    textAlign:"center",
    gap:"30px",
    color:"green"
}
  return (
    <div style={divStyle}>
      <h2>Payment Successfull!</h2>
    <h2>Please wait while we redirect you to home page...</h2>
    </div>
  )
}

export default Success
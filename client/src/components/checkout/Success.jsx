import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../../credentials';
import axios from 'axios';

function Success() {
  const navigate = useNavigate();
  useEffect(()=>{
    const sessionId = localStorage.getItem("sessionId");
    const updateOrderStatus = async()=>{
      const res = await axios.post(`${baseURL}/auth/orders`,{sessionId});
      console.log(res.data);
    }
    updateOrderStatus();
  },[])
  useEffect(() => {
    const timeout = setTimeout(()=>{
      navigate("/");
    },[4000]);
  
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  const divStyle = {
    paddingTop:"80px",
    height:"100vh",
    overflow:"auto",
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
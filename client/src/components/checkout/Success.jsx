import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { accessToken, baseURL, deliveryRange, orderedItems } from '../../../credentials';
import axios from 'axios';
import { deliveryDate } from './DeliveryChargeTime';

function Success() {
  const navigate = useNavigate();
  useEffect(()=>{
    const items = JSON.parse(sessionStorage.getItem(orderedItems));
    const token = localStorage.getItem(accessToken);
    const {min,max}=JSON.parse(sessionStorage.getItem(deliveryRange))? JSON.parse(sessionStorage.getItem(deliveryRange)):{min:0,max:0};
    const shippingDate =deliveryDate(min,max);
    const status = "success";
    const addOrders = async()=>{
      try {
        const res = await axios.post(`${baseURL}/auth/orders?type=addOrders`,{items,token,status,deliveryDate:shippingDate});
        // sessionStorage.removeItem(orderedItems);
        // sessionStorage.removeItem(deliveryRange);
      } catch (error) {
      }
    }
   items && addOrders();
  },[]);
  useEffect(() => {
    const timeout = setTimeout(()=>{
      navigate("/");
    },[4000]);
  
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  const divStyle = {
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
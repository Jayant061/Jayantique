import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { accessToken, baseURL, deliveryRange, orderedItems } from '../../../credentials';
import axios from 'axios';
import { deliveryDate } from './DeliveryChargeTime';

function Success() {
  const navigate = useNavigate();
  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem(orderedItems));
    const token = localStorage.getItem(accessToken);
    const {min,max}=JSON.parse(localStorage.getItem(deliveryRange));
    const shippingDate = deliveryDate(min,max);
    const status = "success";
    let isSubs = true;
    const addOrders = async()=>{
      try {
        const res = await axios.post(`${baseURL}/auth/addOrders`,{items,token,status,deliveryDate:shippingDate});
        // localStorage.removeItem(orderedItems);
        // localStorage.removeItem(deliveryRange);
      } catch (error) {
      }
    }
    isSubs && items && addOrders();
    return (()=>{
      isSubs = false;
    })
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
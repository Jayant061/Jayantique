import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./orders.css";
import { accessToken, baseURL } from '../../../../credentials';
function Orders() {
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);
  const token = localStorage.getItem(accessToken);
  useEffect(()=>{
    setLoading(true);
    const getOrders = async ()=>{
      const orderItems = await axios.get(`${baseURL}/auth/orders/getOrders?token=${token}`);
      setOrders(orderItems?.data);
      setLoading(false);
    }
    getOrders();
  },[]);
  useEffect(()=>{
  orders[0] && console.log(orders);
  },[orders]);
  return (
    <div className='orders'>
        <h2>{loading? "Loading" : "Orders" }</h2>
        <div className="orderChild">
          
        </div>

    </div>
  )
}

export default Orders
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";
import { accessToken, baseURL } from "../../../../credentials";
import getDeliveryDate from "./getDate";
import Order from "./Order";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem(accessToken);
  useEffect(() => {
    setLoading(true);
    const getOrders = async () => {
      try {
        const orderItems = await axios.get(
          `${baseURL}/auth/orders/getOrders?token=${token}`
        );
        orderItems?.data[0]?.orderItems && setOrders(orderItems?.data);
        setLoading(false);
        
      } catch (error) {
        setLoading(false);

      }
    };
    getOrders();
  }, []);
  // useEffect(() => {
  // }, [orders]);

  const handleInputSubmit = (e)=>{
    e.preventDefault();
  }

  const allOrders = orders?.map((order,index)=>{
    // deliveryStatement
    return(
      <Order order = {order} index={index} key={index}/>
    )
  })
  return <div className="orders">
    <form action="" className="searchinput" onSubmit={handleInputSubmit}>
      <input type="text" placeholder="Search your orders here" />
      <button>Search</button>
    </form>
    <div className="all-orders">
    {allOrders}
    </div>
  </div>;
}

export default Orders;

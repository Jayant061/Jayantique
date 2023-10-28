import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";
import { accessToken, baseURL } from "../../../../credentials";
import getDeliveryDate from "./getDate";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem(accessToken);
  useEffect(() => {
    setLoading(true);
    const getOrders = async () => {
      const orderItems = await axios.get(
        `${baseURL}/auth/orders/getOrders?token=${token}`
      );
      orderItems?.data[0].product && setOrders(orderItems?.data);
      setLoading(false);
    };
    getOrders();
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const handleInputSubmit = (e)=>{
    e.preventDefault();
  }

  const allOrders = orders?.map((order,index)=>{
    const products = order?.orderItems.map((product,index)=>{
    return(
      <div className="order-product" key={index}>
        <div className="product-image">
          <img src={product?.product?.images} alt="" />
        </div>
        <div className="product-info">
          <h4>{product?.product.title}</h4>
          <p>category:{product?.product.category}</p>
          <p>quantity:{product?.quantity}</p>
        </div>
        <div className="product-reviews">
          <span>Rate & Review this Product</span>
        </div>
      </div>
    )
    })
    const currTime = new Date().toISOString();
    return(
      <div className="order" key={index}>
        <div className="order-delivery-status">
          <h4>{currTime>order.deliveyDate?`Order was delivered on `:
          `Order will be delivered by `}{getDeliveryDate(order.deliveryDate)}</h4>
        </div>
        <div className="order-products">
          {products}
        </div>
      </div>
    )
  })
  return <div className="orders">
    <form action="" className="searchinput" onSubmit={handleInputSubmit}>
      <input type="text" placeholder="Search your orders here" />
      <button>Search</button>
    </form>
    <div className="all-orders">
    {/* {allOrders} */}
    </div>
  </div>;
}

export default Orders;

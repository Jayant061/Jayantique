import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { baseURL, deliveryRange, orderedItems, refPane } from "../../../credentials.js";
import { Link } from "react-router-dom";
import "./styles.css";
import getAddress from "./getAddress";
import deliveryChargeAndTime from "./DeliveryChargeTime";
import loadingIcon from "../../assets/loading-loop.svg"
import checkoutImg from "../../assets/checkoutImg.png";
function PaymentDetails() {
  const { price } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [deliveryStat, setDeliveryStat] = useState({});
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { cartItems, itemsQuantity,cartDispatch } = useContext(CartContext);
  const cartData = cartItems?.map((item) => {
    return {
      itemId: item?._id,
      quantity: itemsQuantity.get(item?._id),
    };
  });
  useEffect(()=>{
    document.title = "Jayantique| Checkout";
  },[]);
  async function handleClick(e) {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`${baseURL}/checkout`,{
        data: cartData,
        DC: deliveryStat.deliveryID,
        discount: discount,
      });
      setLoading(false);
      sessionStorage.setItem(orderedItems,JSON.stringify(cartData));
      sessionStorage.setItem(deliveryRange,JSON.stringify(deliveryStat?.deliveryTime));
      // window.open(res.data.url,"_blank");
      // window.location.href = res.data.url;
      console.log(res.data);
    } catch (error) {
    }
  }
  useEffect(() => {
    currentUser.address &&
      deliveryAddress &&
      setDeliveryStat(deliveryChargeAndTime(deliveryAddress.pincode));
    parseInt(price) > 25 && setDiscount((0.1 * price*80).toFixed(2));
  }, [deliveryAddress]);
  
  const homeAddresses =
    currentUser.address &&
    getAddress(currentUser.address.home, setDeliveryAddress, "home");
  const workAddresses =
    currentUser.address &&
    getAddress(currentUser.address.work, setDeliveryAddress, "work");

  return (
    <div className="checkoutPage">

      <img src={checkoutImg} alt="image" className="checkoutImg" />
    <form className="paymentDetails" onSubmit={(deliveryAddress.pincode && cartItems.length)
    ? handleClick:(e)=>{e.preventDefault()}}>
      <div className="deliveryAddresses">
        <span id="deliveryHeading">
          Please choose an address to deliver your order
        </span>
        {currentUser.address && homeAddresses}
        {currentUser.address && workAddresses}
        <Link to="/auth/user" onClick={()=>{sessionStorage.setItem(refPane,"Addresses");
        sessionStorage.setItem("sourcePath",window.location.pathname);}}>
          <button>Add new Address</button>
        </Link>
      </div>
      <div className="deliveryChargeAndTime" style={(deliveryAddress.pincode && cartItems.length)?{}:{display:"none"}}>
        <span id="deliveryHeading">Delivery Stats</span>

        {deliveryStat.deliveryTime && (
          <span>
            Your order will be delivered between{" "}
            {deliveryStat.deliveryTime?.min === deliveryStat.deliveryTime?.max
              ? deliveryStat.deliveryTime.max
              : deliveryStat.deliveryTime?.min +
                " - " +
                deliveryStat.deliveryTime?.max}{" "}
            days
          </span>
        )}
        {deliveryStat.deliveryTime && (
          <span>
            {deliveryStat.DC
              ? `Delivery charge of ${deliveryStat.DC} will apply to your order.`
              : "Free delivery is available to your order"}
          </span>
        )}
      </div>
      {<button className="payBtn">
        {loading? <img src={loadingIcon}/>:"Pay"}
      </button>}
    </form>
    </div>
  );
}

export default PaymentDetails;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { baseURL } from "../../../credentials.js";
import { Link } from "react-router-dom";
import "./styles.css";
import getAddress from "./getAddress";
import deliveryChargeAndTime from "./DeliveryChargeTime";
import loadingIcon from "../../assets/loading-loop.svg"
function PaymentDetails() {
  const { price } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [deliveryStat, setDeliveryStat] = useState({});
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { cartItems, itemsQuantity } = useContext(CartContext);
  const cartData = cartItems?.map((item) => {
    return {
      itemId: item?._id,
      quantity: itemsQuantity.get(item?._id),
    };
  });
  async function handleClick(e) {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(`${baseURL}/checkout`,{
        data: cartData,
        DC: deliveryStat.DC,
        discount: discount,
      });
      // console.log(res.data)
      setLoading(false);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    currentUser.address &&
      deliveryAddress &&
      setDeliveryStat(deliveryChargeAndTime(deliveryAddress.pincode));
    parseInt(price) > 500 && setDiscount((0.1 * price).toFixed(2));
  }, [deliveryAddress]);
  const homeAddresses =
    currentUser.address &&
    getAddress(currentUser.address.home, setDeliveryAddress, "home");
  const workAddresses =
    currentUser.address &&
    getAddress(currentUser.address.work, setDeliveryAddress, "work");

  return (
    <form className="paymentDetails" onSubmit={(deliveryAddress.pincode && cartData.length)
    ? handleClick:(e)=>{e.preventDefault()}}>
      <div className="deliveryAddresses">
        <span id="deliveryHeading">
          Please choose an address to deliver your order
        </span>
        {currentUser.address && homeAddresses}
        {currentUser.address && workAddresses}
        <Link to="/auth/user">
          <button>Add new Address</button>
        </Link>
      </div>
      <div className="deliveryChargeAndTime" style={(homeAddresses || workAddresses)? {display:"none"}:{}}>
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
              ? `Please note that a delivery charge of ${deliveryStat.DC} will apply to your order.`
              : "Free delivery is available to your order"}
          </span>
        )}
      </div>
      {<button className="payBtn">
        {loading? <img src={loadingIcon}/>:"Pay"}
      </button>}
    </form>
  );
}

export default PaymentDetails;

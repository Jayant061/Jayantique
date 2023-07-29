import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { baseURL } from "../../../credentials.js";
import { Link } from "react-router-dom";
import "./styles.css";
import getAddress from "./getAddress";
import deliveryChargeAndTime from "./DeliveryChargeTime";
function PaymentDetails() {
  const {price} = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser.address && JSON.parse(currentUser.address.home[0])
  );
  const [deliveryStat, setDeliveryStat] = useState({});
  const [discount,setDiscount] = useState(0)
  const { cartItems, itemsQuantity } = useContext(CartContext);
  const cartData = cartItems?.map((item) => {
    return {
      itemId: item?._id,
      quantity: itemsQuantity.get(item?._id),
    };
  });
  async function handleClick() {
    try {
      const res = await axios.post(`${baseURL}/checkout?`, { data: cartData,DC:deliveryStat.DC,discount:discount});
      // console.log(res.data)
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    currentUser.address &&
      deliveryAddress &&
      setDeliveryStat(deliveryChargeAndTime(deliveryAddress.pincode));
      parseInt(price)>500 && setDiscount((0.1*price).toFixed(2));
      console.log(discount)
  }, [deliveryAddress]);
  const homeAddresses =
    currentUser.address &&
    getAddress(currentUser.address.home, setDeliveryAddress, "home");
  const workAddresses =
    currentUser.address &&
    getAddress(currentUser.address.work, setDeliveryAddress, "work");

  return (
    <div className="paymentDetails">
      <div className="deliveryAddresses">
        <span id="deliveryHeading">
          Please choose an address to deliver your order
        </span>
        {currentUser.address && homeAddresses}
        {currentUser.address && workAddresses}
        <Link to="/auth/user">
          <button>Edit or Add new Address</button>
        </Link>
      </div>
      <div className="deliveryChargeAndTime">
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
      <button className="payBtn" onClick={handleClick}>
        Pay
      </button>
    </div>
  );
}

export default PaymentDetails;

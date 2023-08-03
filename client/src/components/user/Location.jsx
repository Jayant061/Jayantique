import React, { Suspense, lazy, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import addIcon from "../../assets/add.svg";
import {v4 as uuid} from "uuid";
import axios from "axios";
import jwt_decode from "jwt-decode"
import { baseURL, getUser } from "../../../credentials.js";
const DisplayLocation = lazy(()=>import("./DisplayLocation"));
const AddressForm = lazy(()=>import("./AddressForm"));

function Location() {
  const { currentUser,userDispatch } = useContext(UserContext);
  const [newAddress, setNewAddress] = useState({
    id: uuid(),
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    town: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setNewAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (newAddress.phone?.length !== 10) {
      setError("Invalid mobile number! please enter a valid mobile number");
      return;
    } else if (newAddress.pincode?.length !== 6) {
      setError("Invalid  pincode! please enter a valid  pincode");
      return;
    } else if (newAddress.alternatePhone?.length !== 10 && newAddress.alternatePhone?.length !== 0) {
      setError(
        "Invalid  alternate phone number! please enter a valid  alternate phone number"
      );
      return;
    } else if(newAddress.state === ""){
      setError("Please select state");
      return;
    }
    else {
      setError(" ");
    }
    try {
      const res =  await axios.post(`${baseURL}/auth/updateUser/addAddress`,{newAddress,token:localStorage.getItem("accessToken"),});
      localStorage.setItem("accessToken",res.data);
     const data = jwt_decode(res.data);
     if(data){
       userDispatch({
         type:getUser,
         payload:data?.resData
       });
     }  
     } catch (error) {
       setError(error?.response?.data);
     }
  
  }

  const homeAdress = currentUser?.address?.home?.map((addressIN)=>{
    const {id,addressType,name,phone,address,locality,town,state,pincode} = JSON.parse(addressIN);
    return(<Suspense key = {id} fallback = {<div>loading...</div>}><DisplayLocation key={id}
      data = {{id,addressType,name,phone,address,locality,town,state,pincode}}
    /></Suspense>)
  })

  const workAdress = currentUser?.address?.work?.map(addressIN=>{
    const {id,addressType,name,phone,address,locality,town,state,pincode} = JSON.parse(addressIN);
    
    return(<Suspense key = {id} fallback = {<div>loading...</div>}><DisplayLocation key={id}
      data = {{id,addressType,name,phone,address,locality,town,state,pincode}}
    /></Suspense>)
  })
  return (
    <div className="location">
      <h2>Manage Addresses</h2>
      {!isAddingNewAddress ? (
        <div
          className="addNewAddress"
          onClick={() => {
            setIsAddingNewAddress(true);
          }}
        >
          <img src={addIcon} alt="symbol for add" />
          <span>Add a new address</span>
        </div>
      ) : (
        <Suspense fallback = {<div>loading...</div>}><AddressForm newAddress={newAddress} handleChange={handleChange} handleSubmit={handleSubmit}
        error = {error} setIsAddingNewAddress = {setIsAddingNewAddress}/></Suspense>
      )}

    <div className="addresses">
      <div className="homeAdresses">{homeAdress}</div>
      <div className="workAddresses">{workAdress}</div>
    </div>
    </div>
  );
}

export default Location;

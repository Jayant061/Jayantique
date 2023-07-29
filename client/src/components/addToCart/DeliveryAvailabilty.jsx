import React, { useContext, useEffect, useRef, useState } from 'react'
import tickIcon from "../../assets/tick.svg";
import locationIcon from "../../assets/location.svg";
import { CartContext } from '../../context/CartContext';
import { deliveryCharge, pincodes } from '../../../credentials.js';
function DeliveryAvailabilty() {
    let ref = useRef();
    const[offers,setOffers] = useState({
        freeDelivery:false,
        COD:false,
        deliveryTime:{
            min:"",
            max:""
        }
    });
    const {cartDispatch,pincode} = useContext(CartContext);
    const [currPincode,setPincode] = useState(pincode);
    const [isError,setIsError] = useState(false);
    const [onChange,setOnchange] = useState(false);
    const handleCheck = (e)=>{
        e.preventDefault();
        setOnchange(false);
        if(currPincode.length !== 6 || parseInt(currPincode)<=100000){
            setIsError(true);
            cartDispatch({
                type:deliveryCharge,
                payload:null
            }); 
            cartDispatch({
                type:pincodes,
                payload:currPincode
            });
        }
        else{
            setIsError(false);
            cartDispatch({
                type:pincodes,
                payload:currPincode
            });
            const code = parseInt(parseInt(currPincode)/10000);
            if((10<=code && code<=13) ||(40<=code && code<=44)|| (56<=code && code<=64)){
                setOffers({freeDelivery:true,COD:true,deliveryTime:{min:3,max:3+(code%10 - 1)}});
                cartDispatch({
                    type:deliveryCharge,
                    payload:0
                });
            }
            else if(70<=code && code <=85){
                setOffers({freeDelivery:false,COD:true,deliveryTime:{min:5,max:2+(code%10)}});
                cartDispatch({
                    type:deliveryCharge,
                    payload:40
                });
            }   
            else{
                setOffers({freeDelivery:false,COD:false,deliveryTime:{min:9,max:14}});
                cartDispatch({
                    type:deliveryCharge,
                    payload:45
                });
            }
        }
    }
    useEffect(()=>{
        if(onChange){cartDispatch({
            type:deliveryCharge,
            payload:null
        });}
    },[onChange]);
    
  return (
    <div className='deliveryAvailabilty'>
        <span className='deliveryHeading'>Delivery availability</span>
        <form className="locationInput" onSubmit={handleCheck}>
    <img src={locationIcon} alt="" />
    <input type="number" placeholder='Enter Pincode here!' onChange={
        (e)=>{setPincode(e.target.value);
            setOnchange(true);
        }} value={currPincode}
        ref = {ref}
    />
    <button type='submit'>CHECK</button>
        </form>
        {(isError && !onChange)?
        <span style={{fontSize:"17px",fontWeight:"500",color:"red",textAlign:"center"}}>
            Please Enter a valid Pincode
        </span>
            :
        <div className="offers" style={onChange?{display:"none"}:{}}>

            <div className="freeDelivery offer"
            style={offers.freeDelivery?{}:{display:"none"}}>
                <img src={tickIcon} alt="" />
                <span>Free delivery</span>
            </div>

            <div className="cashOnDelivery offer"
            style={offers.COD?{}:{display:"none"}}>
                <img src={tickIcon} alt="" />
                <span>Cash on delivery</span>
            </div>
            <div className="deliveryTime offer"
            style={offers.deliveryTime.min?{}:{display:"none"}}>

                <img src={tickIcon} alt="" />
                <span>Estimated delivery time is {offers.deliveryTime.min}
                -
                {offers.deliveryTime.min !== offers.deliveryTime.max && offers.deliveryTime.max} days</span>
            </div>
        </div>}
    </div>
  )
}

export default DeliveryAvailabilty
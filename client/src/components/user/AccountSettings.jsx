import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { baseURL, getUser } from '../../credentials';
import Location from './Location';

function AccountSettings() {

  const {currentUser,userDispatch} = useContext(UserContext);
  const [formData,setFormData] = useState({
    token:localStorage.getItem("accessToken"),
    id:currentUser?._id,
    name: currentUser?.name,
    gender:currentUser?.gender,
    email: currentUser?.email,
    phone : currentUser?.phone,
  });
  const [isReadOnly,setReadOnly] = useState(true);
  const [error,setError] = useState("")

  function handleChange(e){
    setFormData(prev=>{return ({...prev,[e.target.name]:e.target.value})});
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    try {
     const res =  await axios.post(`${baseURL}/auth/updateUser`,formData); 
     localStorage.setItem("accessToken",res.data);
    const data = jwt_decode(res.data);
    if(data){
      userDispatch({
        type:getUser,
        payload:data?.resData
      });
    }  
    } catch (error) {
      setError(error?.redponse?.data);
    }
  }

  function handleCancel(){
    setReadOnly(true);
    setFormData(()=>{return({
    token:localStorage.getItem("accessToken"),
    id:currentUser?._id,
    name: currentUser?.name,
    gender:currentUser?.gender,
    email: currentUser?.email,
    phone : currentUser?.phone,
    })})
  }
  useEffect(()=>{
    setFormData(()=>{return({
    token:localStorage.getItem("accessToken"),
    id:currentUser?._id,
    name: currentUser?.name,
    gender:currentUser?.gender,
    email: currentUser?.email,
    phone : currentUser?.phone,
    })})
  },[currentUser]);
  return (
    <div className='accountSettings'>
        <h2>Personal Information</h2>
        <div className="personalInfo">
          <div className="username personalInfoChild">
            <span>Name :</span>
          <input type="text" name = "name" value={formData?.name} readOnly = {isReadOnly} 
          onChange={handleChange} style={isReadOnly?{cursor:'no-drop',backgroundColor:"lightyellow"}:{}}/>
          </div>
          <div className="gender personalInfoChild">
            <span>Gender : </span>
            <div id="registrationPartition" className="inputsPartition"style={isReadOnly?{cursor:'no-drop',backgroundColor:"lightyellow"}:{}}>
              <div className="radioInput">
                <input type="radio" id="male" name="gender" value="Male"
                 checked={formData.gender === "Male"}
                  onChange={!isReadOnly ? handleChange : ()=>{}} required={true} 
                  style={isReadOnly?{cursor:'no-drop'}:{}}
                />
                <label htmlFor="male" style={isReadOnly?{cursor:'no-drop'}:{}}>Male</label>
              </div>
              <div className="radioInput">
                <input type="radio" id="female" name="gender" value="Female"
                 checked={formData.gender ===  "Female"}
                  onChange={!isReadOnly ? handleChange : ()=>{}} required={true} 
                  style={isReadOnly?{cursor:'no-drop'}:{}}
                />
                <label htmlFor="female" style={isReadOnly?{cursor:'no-drop'}:{}}>Female</label>
              </div>
            </div>
          </div>
          <div className="email personalInfoChild">
          <span>Email :</span>
            <input type="email" name="email" id="" value={formData?.email} readOnly = {isReadOnly}  
            onChange={handleChange} style={isReadOnly?{cursor:'no-drop', backgroundColor:"lightyellow"}:{}}/>
          </div>
          <div className="phone personalInfoChild">
          <span>Phone :</span>
            <input type="number" name='phone' value={formData?.phone} readOnly = {isReadOnly}  
            onChange={handleChange} style={isReadOnly?{cursor:'no-drop', backgroundColor:"lightyellow"}:{}}/>
          </div>
          <div className="buttons">
            {isReadOnly ? <button onClick={()=>{setReadOnly(false)}}>Edit</button>
            :<button onClick={handleCancel} >Cancel</button>}
            {!isReadOnly && <button onClick={handleSubmit}>Save</button>}
          </div>
          {error && <span style={{color:"red",textAlign:"center"}}>{error}</span>}
        </div>
        <Location/>
    </div>
  )
}

export default AccountSettings
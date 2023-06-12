import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {baseURL, getUser} from "../../credentials.js"
import axios from "axios";
import "./authStyles.css";
import { UserContext } from "../../context/UserContext.jsx";

function Register() {
  const {userDispatch} = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    gender:"",
    email: "",
    password: "",
    phone: "",
  });
  const [error,setError] = useState(null);

  useEffect(()=>{document.title = "Jayantique | register"},[]);
  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    error && setError(null);
  }
  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    if(formData.phone.length !== 10){
        setError("Please enter a vaild phone number");
    }
    try {
    const res = await axios.post(`${baseURL}/register`,formData);
    localStorage.setItem("accessToken",res.data);
            const data = jwt_decode(res.data);
            userDispatch({
              type:getUser,
              payload:data?.resData
            });
            navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  }
  return (
    <div className="register auth">
      <div className="registerWrapper authWrapper">
        <span className="authHeader">Test</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            onChange={handleChange}
            required
          />
          <div className="registerInput">
            <span>Gender : </span>
            <div id="registrationPartition" className="inputsPartition">
              <div className="radioInput">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required={true}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radioInput">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  required={true}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password*"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone*"
            onChange={handleChange}
            onWheel={(e) => e.target.blur()}
            required
          />
          <button>Sign up</button>
        </form>
        {error && <span style={{color:"red"}}>{error}</span>}
        <span>Already have an Account? <Link to="/login"> Login</Link></span>
      </div>
    </div>
  );
}

export default Register;

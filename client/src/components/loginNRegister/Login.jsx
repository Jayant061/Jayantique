import React, { useContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./authStyles.css";
import { baseURL, getUser } from '../../credentials';
import { UserContext } from '../../context/UserContext';
import showPasswordIcon from "../../assets/show.svg";
import hidePasswordIcon from "../../assets/hide.svg";

function Login() {
    const [error,setError] = useState(null);
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    const [showPassword,setShowPassword] =useState(false);
    // const [authStatus,setAuthStatus] = useState(false);
    function handleChange(e){
        setFormData(prev=>{return{...prev,[e.target.name]:e.target.value}});
    }
    const navigate = useNavigate();
    const location = useLocation();

    const {userDispatch} = useContext(UserContext);

    async function handleSubmit(e){
        e.preventDefault();
        try {
          const resp = await axios.post(`${baseURL}/login`,formData);
          localStorage.setItem("accessToken",resp.data);
            const data = jwt_decode(resp.data);
            userDispatch({
              type:getUser,
              payload:data?.resData
            });
            // setAuthStatus(true);
            if(location.state?.from){
              navigate(location.state.from);
            }
            else{
              navigate("/");
            }
        } catch (error) {  
          setError(error?.response?.data);
        }
    }
    useEffect(()=>{
     document.title = "Jayantique | login"
    },[]);
  return (
    <div className="login auth">
    <div className="loginWrapper authWrapper">
        <span className='authHeader'>Test</span>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value = {formData.email}
          placeholder="Email*"
          onChange={handleChange}
          required
        />
        <div className='password'>
          <input
          type={!showPassword? "password":"text"}
          name="password"
          value={formData.password}
          placeholder="password*"
          onChange={handleChange}
          required
          />
          <img src={showPassword? hidePasswordIcon : showPasswordIcon} alt="eye" 
          onClick={()=>{setShowPassword(prev=>{return !prev})}}/>
        </div>
        <button>Sign in</button>
      </form>
      {error && <span style={{color:"red"}}>{error}</span>}
      <span>Don't have an Account? <Link to = "/register">Register</Link></span>
    </div>
  </div>
  )
}

export default Login
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Cancel() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const timeout = setTimeout(()=>{
  //     navigate("/");
  //   },[4000]);
  
  //   return () => {
  //     clearTimeout(timeout);
  //   }
  // }, []);
  const divStyle = {
    paddingTop:"80px",
    height:"100vh",
    overflow:"auto",
    marginTop:"50px",
    display:"flex",
    flexDirection:"Column",
    alignItems:"center",
    textAlign:"center",
    gap:"30px",
    color:"red"
}

  return (
    <div style={divStyle}>
      <h2>You declined the payment request </h2>
      <h2>You will be redirected to homepage within 5 seconds...</h2>
      </div>
  )
}

export default Cancel
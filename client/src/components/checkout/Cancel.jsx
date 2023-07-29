import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Cancel() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(()=>{
      navigate("/");
    },[4000]);
  
    return () => {
      clearTimeout(timeout);
    }
  }, []);
  
  return (
    <div>
      <h2>You declined the payment request </h2>
      <h2>You will be redirected to homepage within 5 seconds...</h2>
      </div>
  )
}

export default Cancel
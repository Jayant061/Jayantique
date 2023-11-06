import React from 'react'
import "./loadingSpinner.css";
function LoadingSpinner({error, width}) {
  return (
    <div className="loadingSpinnerParent" style={error?{height:"200px"}:{height: "100vh"}}>
      <div className="loadingSpinner" ></div>
      {error? <span style={{textAlign:"center",color:"red"}}>{error}</span>:<></>}
    </div>
  )
}

export default LoadingSpinner
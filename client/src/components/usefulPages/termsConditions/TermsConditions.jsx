import React, { useEffect, useRef } from 'react';
import { termsAndConditionsContent } from '../../../../credentials';
import "./tnc.css";

function TermsConditions() {
    const startRef = useRef();
    useEffect(() => {
      if(startRef.current){
        startRef.current.scrollIntoView({behavior:"smooth"})
      }
      document.title = "Jayantique | T&C"
    
    }, [])
    
const contents = termsAndConditionsContent.map((item,index)=>{
    return(
        <div className="content" key={index}>
            <h4>{item.heading}</h4>
            <p>{item.content}</p>
        </div>
    )
})
  return (
    <div className='termsConditions'>
        <div className="contents" ref={startRef}>
            {contents}
        </div>
    </div>
  )
}

export default TermsConditions
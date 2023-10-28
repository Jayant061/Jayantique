import React, { useEffect, useRef } from 'react'
import { privacyPolicyContent } from '../../../../credentials';
import "./pp.css";

function PrivacyPolicy() {
  const startRef = useRef();
    useEffect(() => {
      if(startRef.current){
        startRef.current.scrollIntoView({behavior:"smooth"});
      }
    
      document.title = "Jayantique | Privacy-Policy"
    }, [])
      const contents = privacyPolicyContent?.map((item,index)=>{
        const multiContents = item?.contents?.map((section,index2)=>{
          return(
            <div className="content" key={index2 + "a"}>
                <h4>{section.heading}</h4>
                <p>{section.content}</p>
            </div>
          )
        })
        return(
          multiContents? <div className='parentContent' key={index + "b"}>
            <h3>{item.title}</h3>
            {multiContents}
          </div>:
          <div className="content" key={index + "c"}>
          <h4 style={{textAlign:"center",textDecoration:"underline"}}>{item.heading}</h4>
          <p>{item.content}</p>

      </div>
        )
      })

  return (
    <div className="privacyPolicy">
      <div className="contents" ref={startRef}>
      {contents}
      </div>
      <div className="sign">
        <p>Last Updated: 26th August 2023</p>
        <p>Jayant Thakur<br/>Founder, Jayantique</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
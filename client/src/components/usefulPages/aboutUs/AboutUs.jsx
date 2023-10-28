import React, { useEffect, useRef } from "react";
import "./about.css"
import { aboutUsContents } from "../../../../credentials";

const AboutUs = () => {
  const startRef = useRef();
  useEffect(() => {
    document.title = "Jayantique | About us";
    if(startRef.current){
      startRef.current.scrollIntoView({behavior:"smooth"});
    }
  }, []);
  
  const contents = aboutUsContents?.map((item,index)=>{
    return(
      <div className="content" key={index}>
        <h4>{item?.heading}</h4>
        <p>{item?.content}</p>
      </div>
    )
  })
  return <div className="about-us">
    <div className="contents" ref={startRef}>
  {contents}
    </div>

    <div className="sign">
      <p>Thank you for choosing Jayantique as your destination for timeless elegance.</p>
      <p>Sincerely,</p>
      <p>Jayant Thakur</p>
    </div>
  </div>;
};

export default AboutUs;

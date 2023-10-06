import React, {useState } from "react";
import leftIcon from "../../assets/left.svg";
import rightIcon from "../../assets/right.svg";
import "./pagination.css";
export default function Pagination({setPage,itemNumber}) {
  const [number,setnumber] = useState(0);
  const [loading,setLoading] = useState(false);
  return (
    <div className="pagination">
      <div className="pageButton" onClick={()=>{setPage(prev=>{return prev>1?prev-1:1})}}>
        <img src={leftIcon} alt="" />
      </div>
      <div className="pageInput">
        <input type="text" name="page" id="" placeholder=""
        onChange={(e)=>{setnumber(e.target.value)}}/>
        <button onClick={()=>{number !==0 && setPage(number)}}>Go To Page</button>
      </div>
      <div className="pageButton" onClick={()=>{itemNumber<20 && setPage(prev=>{return prev+1})}}>
        <img src={rightIcon} alt="" />
      </div>
    </div>
  );
}

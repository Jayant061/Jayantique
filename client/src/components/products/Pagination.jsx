import React, { useContext, useEffect, useState } from "react";
import leftIcon from "../../assets/left.svg";
import rightIcon from "../../assets/right.svg";
import loader from "../../assets/loading.svg";
import "./pagination.css";
import { URLContext } from "../../context/URLContext";


export default function Pagination({ itemNumber }) {
  const { URLState,URLDispatch } = useContext(URLContext);
  const [number, setNumber] = useState(URLState.page?parseInt(URLState.page):0);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      window.scrollTo({top: 0});
      const timeOut = setTimeout(()=>{
      sessionStorage.setItem("isProductReq","true");
      parseInt(URLState.page) !== number && URLDispatch({
        type:"page",
        payload:parseInt(number)
      });
    },1000)
    return()=>{
      // setLoading(false);
      clearTimeout(timeOut)
    }
  },[loading]);

  return (
    <>
      {!(number === 1 && itemNumber < 20) ? (
        <div className="pagination">
          {parseInt(number) !== 1?
            <div
              className="pageButton"
              onClick={() => {
                setNumber((prev) => {
                  return prev - 1;
                });
                setLoading(true); 
              }}
            >
              <img src={leftIcon} alt="" />
            </div>:<></>
          }
          {!loading ? (
            <div className="pageInput">
              <input
                type="number"
                name="page"
                id=""
                value={number}
                placeholder=""
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
              <button onClick={()=>{setLoading(true);}}>Go To Page</button>
            </div>
          ) : (
            <img src={loader} alt="loading..." style={{ height: "100%" }} />
          )}
          {itemNumber >= 20 ? (
            <div
              className="pageButton"
              onClick={() => {
                setNumber((prev) => {
                  return prev + 1;
                });
                setLoading(true);
              }}
            >
              <img src={rightIcon} alt="" />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

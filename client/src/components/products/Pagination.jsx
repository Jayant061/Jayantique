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

  function handleClick() {
    setLoading(true);
    URLDispatch({
      type:"page",
      payload:parseInt(number)
    });
  }
  useEffect(()=>{
    (parseInt(URLState.page) !== number)&& URLDispatch({type:"page",payload:number});
  },[number])
  return (
    <>
      {!(number === 1 && itemNumber < 20) ? (
        <div className="pagination">
          {parseInt(number) !== 1?
            <div
              className="pageButton"
              onClick={() => {
                setNumber((prev) => {
                  return parseInt(prev) - 1;
                });
                setLoading(true);
                sessionStorage.setItem("isProductReq","true");
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
              <button onClick={handleClick}>Go To Page</button>
            </div>
          ) : (
            <img src={loader} alt="loading..." style={{ height: "100%" }} />
          )}
          {itemNumber >= 20 ? (
            <div
              className="pageButton"
              onClick={() => {
                setNumber((prev) => {
                  return parseInt(prev) + 1;
                });
                setLoading(true);
                sessionStorage.setItem("isProductReq","true");
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

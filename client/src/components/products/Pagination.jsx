import React, { useContext, useEffect, useState } from "react";
import leftIcon from "../../assets/left.svg";
import rightIcon from "../../assets/right.svg";
import loader from "../../assets/loading.svg";
import "./pagination.css";
import { ProductContext } from "../../context/ProductsContext";
export default function Pagination({ setPage, itemNumber }) {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(ProductContext);
  function handleClick() {
    if (number !== 0) {
      setPage(number);
    }
    else{
      setPage(1);
    }
    setLoading(true);
    sessionStorage.setItem("isProductReq","true");
  }
  useEffect(() => {
    setLoading(false);
    const query = new URLSearchParams(window.location.search);
    const q = query.get('page')
    setNumber(parseInt(q));
  }, [state]);
  return (
    <>
      {!(number === 1 && itemNumber < 20) ? (
        <div className="pagination">
          {number !== 1?
            <div
              className="pageButton"
              onClick={() => {
                setPage((prev) => {
                  return prev - 1;
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
                type="text"
                name="page"
                id=""
                placeholder=""
                onChange={(e) => {
                  setNumber(parseInt(e.target.value));
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
                setPage((prev) => {
                  return prev + 1;
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

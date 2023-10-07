import React, { useContext, useEffect, useState } from "react";
import leftIcon from "../../assets/left.svg";
import rightIcon from "../../assets/right.svg";
import loader from "../../assets/loading.svg";
import "./pagination.css";
import { ProductContext } from "../../context/ProductsContext";
export default function Pagination({ setPage, itemNumber }) {
  const [number, setnumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState();
  const { state } = useContext(ProductContext);
  function handleClick() {
    if (number !== 0) {
      setPage(parseInt(number));
      setLoading(true);
    }
  }
  useEffect(() => {
    setLoading(false);
    const query = new URLSearchParams(window.location.search);
    const q = query.get('page')
    setPageNumber(parseInt(q));
  }, [state]);
  return (
    <>
      {!(pageNumber === 1 && itemNumber < 20) ? (
        <div className="pagination">
          {pageNumber !== 1?
            <div
              className="pageButton"
              onClick={() => {
                setPage((prev) => {
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
                type="text"
                name="page"
                id=""
                placeholder=""
                onChange={(e) => {
                  setnumber(e.target.value);
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

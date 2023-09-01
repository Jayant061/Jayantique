import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const FminTimeOut = setTimeout(() => {
      setMessage("You will be redirected to home page in a moment");
    }, [5000]);
    const SminTimeOut = setTimeout(() => {
      navigate("/");
    }, [8000]);
    return () => {
      clearTimeout(FminTimeOut);
      clearTimeout(SminTimeOut);
    };
  }, []);
  const stylesText = { textAlign: "center", color: "red", maxWidth: "600px" };
  const stylesMessage = {
    textAlign: "center",
    color: "green",
    maxWidth: "600px",
  };
  const divStyle = {
    height: "calc(100vh - 56px)",
    overflow: "auto",
    marginTop: "50px",
    display: "flex",
    flexDirection: "Column",
    alignItems: "center",
    gap: "30px",
    TextDecoration:"justify"
  };

  return (
    <div style={divStyle}>
      <h3 style={stylesText}>
        Your transaction encountered an error This is due to checking out of
        empty cart or something went wrong.
      </h3>
      <h3 style={stylesText}>Please Try again.</h3>
      {message && <h3 style={stylesMessage}>{message}</h3>}
    </div>
  );
}

export default Error;

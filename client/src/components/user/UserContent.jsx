import React, { Suspense, lazy } from "react";
const PersonalInfo = lazy(()=>import("./AccountSettings/personalInfo/PersonalInfo"));
const Address = lazy(()=>import("./address/Address"));
const Orders = lazy(()=>import("./orders/Orders"));

import "./userStyles.css";
import LoadingSpinner from "../../assets/loadingSpinner/LoadingSpinner";

function UserContent({activePane}) {

  return (
    <div className="userContent">
      {activePane === "Account Settings" && <Suspense fallback = {<LoadingSpinner/>}><PersonalInfo/></Suspense>}
      {activePane==="Addresses" && <Suspense fallback = {<LoadingSpinner/>}><Address/></Suspense>}
      {activePane==="Orders" && <Suspense fallback = {<LoadingSpinner/>}><Orders/></Suspense>}      
    </div>
  )
}

export default UserContent
import React, { Suspense, lazy } from "react";
const PersonalInfo = lazy(()=>import("./AccountSettings/personalInfo/PersonalInfo"));
const Address = lazy(()=>import("./address/Address"));
const Orders = lazy(()=>import("./orders/Orders"));

import "./userStyles.css";

function UserContent({activePane}) {
  return (
    <div className="userContent">
      {activePane === "Account Settings" && <Suspense fallback = {<div>loading...</div>}><PersonalInfo/></Suspense>}
      {activePane==="Address" && <Suspense fallback = {<div>loading...</div>}><Address/></Suspense>}
      {activePane==="My Orders" && <Suspense fallback = {<div>loading...</div>}><Orders/></Suspense>}
      
    </div>
  )
}

export default UserContent
import React, { Suspense, lazy } from "react";
import "./userStyles.css";
const AccountSettings = lazy(()=>import("./AccountSettings"));

function UserContent({activePane}) {
  return (
    <div className="userContent">
      {activePane === "Account Settings" && <Suspense fallback = {<div>loading...</div>}><AccountSettings/></Suspense>}
      
    </div>
  )
}

export default UserContent
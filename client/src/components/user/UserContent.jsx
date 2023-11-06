import React, { Suspense, lazy } from "react";
const PersonalInfo = lazy(()=>import("./AccountSettings/personalInfo/PersonalInfo"));
const Address = lazy(()=>import("./address/Address"));
const Orders = lazy(()=>import("./orders/Orders"));

import "./userStyles.css";
import LoadingSpinner from "../../assets/loadingSpinner/LoadingSpinner";
import { Route, Routes } from "react-router-dom";

function UserContent() {

  return (
    <div className="userContent">
    <Routes>
    <Route exact path="/PersonalInfo" element = {<Suspense fallback = {<LoadingSpinner/>}><PersonalInfo/></Suspense>}/>
    <Route exact path = "addresses" element = {<Suspense fallback = {<LoadingSpinner/>}><Address/></Suspense>}/>
    <Route exact path="/orders" element = {<Suspense fallback = {<LoadingSpinner/>}><Orders/></Suspense>}></Route>
    </Routes>
    </div>
  )
}

export default UserContent
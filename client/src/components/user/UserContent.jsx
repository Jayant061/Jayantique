import React from 'react';
import "./userStyles.css";
import AccountSettings from "./AccountSettings"

function UserContent({activePane}) {
  return (
    <div className='userContent'>
      {activePane === "Account Settings" && <AccountSettings/>}
      
    </div>
  )
}

export default UserContent
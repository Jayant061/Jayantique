import React from 'react';
import "../userStyles.css";

function DisplayAddress({data,width}) {

    return (
      <div className="addressChild" key={data?.id} style={width?{maxWidth:width}:{}}>
          <span className="addressType">{data?.addressType}</span>
          <div className="mainInfo">
            <span>{data?.name}</span>
            <span>{data?.phone}</span>
            </div>
              <span className="addressDesc">{data?.address + ", "}{data?.locality + ", "}{data?.town + ", "}{data?.state}</span>
              <span className="pincode">{data?.pincode}</span>
      </div>
    )
  };

export default DisplayAddress;
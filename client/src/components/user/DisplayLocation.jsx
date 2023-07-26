import React from 'react'

function DisplayLocation({data}) {

    return (
      <div className="addressChild" key={data?.id}>
          <span className="addressType">{data?.addressType}</span>
          <div className="mainInfo">
            <span>{data?.name}</span>
            <span>{data?.phone}</span>
            </div>
              <span className="addressDesc">{data?.address + ", "}{data?.locality + ", "}{data?.town + ", "}{data?.state}</span>
              <span className="pincode">{data?.pincode}</span>
      </div>
    )
  }

export default DisplayLocation
import React from 'react'

function OrderProducts({product,index}) {
  return (
    <div className="order-product" key={index}>
        <div className="product-image">
          <img src={product?.product?.images[0]} alt="" />
        </div>
        <div className="product-info">
          <h4>{product?.product?.title}</h4>
          <p>category:{product?.product?.category}</p>
          <p>quantity:{product?.quantity}</p>
        </div>
        <div className="product-reviews">
          <span>Rate & Review this Product</span>
        </div>
      </div>
  )
}

export default OrderProducts
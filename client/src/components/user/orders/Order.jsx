import React from 'react'
import OrderProducts from './OrderProducts';
import getDeliveryDate from './getDate';

function Order({order,index}) {
    const currTime = new Date().toISOString();
    const products = order?.orderItems?.map((product,index)=>{
        return product && (
         <OrderProducts product = {product} index={index} key={index} />
       )
       })
  return (
        <div className="order" key={index}>
        <div className="order-delivery-status">
          <h4>{currTime>order.deliveryDate?`Order was delivered on `:
          `Order will be delivered by `}{getDeliveryDate(order.deliveryDate)}</h4>
        </div>
        <div className="order-products">
          {products}
        </div>
      </div>
  )
}

export default Order
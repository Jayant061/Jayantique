import React, { useContext, useState } from 'react'
import addIcon from "../../assets/add.svg";
import subtractIcon from "../../assets/subtract.svg";
import subtractDisableIcon from "../../assets/subtractDisable.svg";
import deleteIcon from "../../assets/delete.svg";

import "./cartPageStyles.css";
import { decreasePrice, decrementQuantity, deleteCartItem, deleteCartItemsId, increasePrice, incrementQuantity } from '../../credentials';
import { CartContext } from '../../context/CartContext';


function CartItem({product,qty}) {
    const {cartDispatch} = useContext(CartContext);
    const [itemquantity,setItemQuantity] = useState(qty);
    const [isItemDeleted,setIsItemDeleted] = useState(false);
    const price = parseFloat(product?.price);

    function handleIncrement(){
        cartDispatch({
            type:incrementQuantity,
            payload:product?._id
        });
        setItemQuantity(prev=>{return prev+1});
        cartDispatch({
            type:increasePrice,
            payload:price
        });
    }
    function handleDecrement(){
        cartDispatch({
            type:decrementQuantity,
            payload:{id:product?._id,qty:1}
        });
        setItemQuantity(prev=>{return prev-1});
        cartDispatch({
            type:decreasePrice,
            payload:price
        })
    }
    
    function handleDelete(){
        cartDispatch({
            type:decrementQuantity,
            payload:{id:product?._id,qty:itemquantity}
        });
        cartDispatch({
            type:decreasePrice,
            payload:(itemquantity*price)
        })
        cartDispatch({
            type:deleteCartItem,
            payload:product._id
        });
        cartDispatch({
            type:deleteCartItemsId,
            payload:product._id,
        })
        setItemQuantity(0);
        setIsItemDeleted(true);
    }
  return (
    <div className="cartItem" style={isItemDeleted ? {display:"none"}:{}}>
            <div className="productInfo">
            <img src={product?.image} alt="" />
            <span>{product?.title.slice(0,50)}{product?.title.length>50?"...":""}</span>
            </div>
            <div className="productPrice">
                <span>$ {product?.price}</span>
            </div>
            <div className="productQuantity">
                <img src={addIcon} alt=""onClick={handleIncrement} />
                <span>{itemquantity}</span>
                {itemquantity === 1 ?
                <img src={subtractDisableIcon} alt="" />
                :
                <img src={subtractIcon} alt=""  onClick={handleDecrement}/>

            }
            </div>
            <div className="subtotal">
                <span>{parseFloat(price*itemquantity).toFixed(2)}</span>
                <img src={deleteIcon} alt=""  onClick={handleDelete}/>
            </div>

        </div>
  )
}

export default CartItem
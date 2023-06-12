import { createContext, useReducer } from "react";
import {
  decreasePrice,
  decrementQuantity,
  deliveryCharge,
  increasePrice,
  incrementQuantity,
  addToCart,
  addCartItemsId,
  deleteCartItem,
  deleteCartItemsId,
  pincodes
} from "../credentials";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // state

  const INITIALSTATE = {
    price: 0,
    quantity: 0,
    deliveryCharge: null,
    pincode:"",
    cartItems: [],
    addedItemsId: new Set([]),
    itemsQuantity: new Map()

  };

  //reducer
  const cartReducer = (state, action) => {
    switch (action.type) {

      case incrementQuantity:
        const qty= state.itemsQuantity.get(action.payload);
        state.itemsQuantity.set(action.payload, qty+1);
        return {
          ...state,
          quantity: state.quantity + 1,
        };
      case decrementQuantity:
        const decQty= state.itemsQuantity.get(action.payload.id);
        state.itemsQuantity.set(action.payload.id, decQty-1); 
        return {
          ...state,
          quantity: state.quantity - action.payload.qty,
        };
      case increasePrice:
        return {
          ...state,
          price: state.price + action.payload,
        };
      case decreasePrice:
        return {
          ...state,
          price: state.price - action.payload,
        };
      case deliveryCharge:
        return {
          ...state,
          deliveryCharge: action.payload,
        };
        case addToCart:
        state.cartItems.push(action.payload);
        state.itemsQuantity.set(action.payload?._id, 1);
        return({
          ...state,
          price:state.price += action.payload?.price,
          quantity:state.quantity += 1
        });

      case addCartItemsId:
        state.addedItemsId.add(action.payload);
        return state;

      case deleteCartItem:
        const modifiedItems = state.cartItems?.filter(cartItem=>
          cartItem?._id !== action.payload
        );
        return({
          ...state,
          cartItems:modifiedItems
        });

      case deleteCartItemsId:
        state.addedItemsId.delete(action.payload);
        state.itemsQuantity.delete(action.payload);
        return state;
      
      case pincodes:
        return({
          ...state,
          pincode:action.payload,
        });
      
      default:
        return state;
    }
  };
  const [state, cartDispatch] = useReducer(cartReducer, INITIALSTATE);
  return(
    <CartContext.Provider
    value={{
        price:state.price,
        quantity:state.quantity,
        deliveryCharge:state.deliveryCharge,
        cartItems: state.cartItems,
        addedItems: state.addedItemsId,
        itemsQuantity:state.itemsQuantity,
        pincode:state.pincode,
        cartDispatch
    }}>
        {children}
    </CartContext.Provider>
  );
};

import { freeDeliveryID, freeDeliveryID2, freeDeliveryID3 } from "../../../credentials";

export default  function deliveryChargeAndTime(pincode){
    const code = Math.floor((parseInt(pincode)/10000));

    if(!pincode){
        return{}
    }

    if((10<=code && code<=13) ||(40<=code && code<=44)|| (56<=code && code<=64)){
        return({freeDelivery:true,DC:0,deliveryTime:{min:3,max:5},deliveryID:freeDeliveryID})
    }
    else if(70<=code && code <=85){
        return({freeDelivery:false,DC:40,deliveryTime:{min:5,max:7},deliveryID:freeDeliveryID2});
    }   
    else{
        return({freeDelivery:false,DC:50,deliveryTime:{min:9,max:11},deliveryID:freeDeliveryID3});
    }
}

export const months = ["January","February","March","April","May","June","July","August",
"September","October","November","December"];
export const deliveryDate = (min,max)=>{
    const range = Math.floor(Math.random()*(max-min));
    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate.addDays(min + range));
    const resultDate = deliveryDate.toISOString();
    return resultDate;
}
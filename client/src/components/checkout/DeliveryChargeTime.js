export default  function deliveryChargeAndTime(pincode){
    const code = Math.floor((parseInt(pincode)/10000));

    if((10<=code && code<=13) ||(40<=code && code<=44)|| (56<=code && code<=64)){
        return{freeDelivery:true,DC:0,deliveryTime:{min:3,max:3+(code%10 - 1)}}
    }
    else if(70<=code && code <=85){
        return({freeDelivery:false,DC:40,deliveryTime:{min:5,max:2+(code%10)}});
    }   
    else{
        return({freeDelivery:false,DC:50,deliveryTime:{min:9,max:14}});
    }
}
export const months = ["January","February","March","April","May","June","July","August",
"September","October","November","December"];
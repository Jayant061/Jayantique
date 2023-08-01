export default  function deliveryChargeAndTime(pincode){
    const code = Math.floor((parseInt(pincode)/10000));

    if(!pincode){
        return{}
    }

    if((10<=code && code<=13) ||(40<=code && code<=44)|| (56<=code && code<=64)){
        return({freeDelivery:true,DC:0,deliveryTime:{min:3,max:5},deliveryID:"shr_1NaFMnSFUYRsQMgq5jyLS0xV"})
    }
    else if(70<=code && code <=85){
        return({freeDelivery:false,DC:40,deliveryTime:{min:5,max:7},deliveryID:"shr_1NaFGBSFUYRsQMgqYwOajeql"});
    }   
    else{
        return({freeDelivery:false,DC:50,deliveryTime:{min:9,max:11},deliveryID:"shr_1NaFOMSFUYRsQMgq1VRLkt2S"});
    }
}
export const months = ["January","February","March","April","May","June","July","August",
"September","October","November","December"];
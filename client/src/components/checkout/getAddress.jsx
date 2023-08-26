import DisplayLocation from "../user/DisplayLocation";

export default function getAddress(arr,setDeliveryAddress,addressType){
    const addresses = arr.map((address,index)=>{
        return(
                <div
                  key={index}
                  className="deliveryAddress"
                >
                  <input
                    type="radio"
                    name="deliveryAddress"
                    id= {addressType + index}
                    value={address}
                    onClick={() => {
                      setDeliveryAddress(JSON.parse(address));
                    }}
                    required
                  />
                  <label htmlFor={addressType + index}>
                    <DisplayLocation key={index} data={JSON.parse(address)} width = "700px" />
                  </label>
                </div>
        )
    })
    return addresses;
}
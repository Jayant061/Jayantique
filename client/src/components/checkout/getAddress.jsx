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
                  />
                  <label htmlFor={addressType + index}>
                    <DisplayLocation key={index} data={JSON.parse(address)} />
                  </label>
                </div>
        )
    })
    return addresses;
}
import React from 'react'

function AddressForm({newAddress,handleChange,handleSubmit,error,setIsAddingNewAddress}) {
  return (
    <form onSubmit={handleSubmit} className="addressForm">
          <div className="addressFormInputs">
            <div className="addressFormInput">
              <label htmlFor="name">Name*:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name*"
                required={true}
                value={newAddress.name}
                onChange={handleChange}
              />
            </div>
            <div className="addressFormInput">
              <label htmlFor="phone">Phone*:</label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="10 digit mobile number*"
                required={true}
                value={newAddress.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addressFormInputs">
            <div className="addressFormInput">
              <label htmlFor="pincode">Pincode*:</label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                placeholder="Pincode*"
                required={true}
                value={newAddress.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="addressFormInput">
              <label htmlFor="locality">Locality*:</label>
              <input
                type="text"
                name="locality"
                id="locality"
                placeholder="Locality*"
                required={true}
                value={newAddress.locality}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addressFormInput">
            <label htmlFor="address">Address (Area & Street)*:</label>
            <textarea
              name="address"
              id="address"
              cols="50"
              rows="5"
              placeholder="Address (Area & Street)*"
              required={true}
              value={newAddress.address}
              onChange={handleChange}
            />
          </div>
          <div className="addressFormInputs">
            <div className="addressFormInput">
              <label htmlFor="city">City/District/Town*:</label>
              <input
                type="text"
                name="town"
                id="city"
                placeholder="City/District/Town*"
                required={true}
                value={newAddress.town}
                onChange={handleChange}
              />
            </div>
            <div className="addressFormInput">
              <label htmlFor="state">State*:</label>
              <select
                name="state"
                id="state"
                value={newAddress.state}
                required={true}
                onChange={handleChange}
              >
                <option value={""} style={{color:"lightgray"}}>--Select State--</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhatisgarh">Chhatisgarh</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>
          </div>
          <div className="addressFormInputs">
            <div className="addressFormInput">
              <label htmlFor="landmark">Landmark (optional)</label>
              <input
                type="text"
                name="landmark"
                id="landmark"
                value={newAddress.landmark}
                placeholder="Landmark"
                onChange={handleChange}
              />
            </div>
            <div className="addressFormInput">
              <label htmlFor="alternateNumber">
                Alternate phone (optional)
              </label>
              <input
                type="number"
                name="alternatePhone"
                id="alternateNumber"
                value={newAddress.alternatePhone}
                placeholder="Alternate phone"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addressFormInput">
            <span>Adress type : </span>
            <div id="partition">
              <div className="radioInput">
                <input
                  type="radio"
                  id="home"
                  name="addressType"
                  value="HOME"
                  checked={newAddress.addressType === "HOME"}
                  onChange={handleChange}
                  required={true}
                />
                <label htmlFor="home">Home</label>
              </div>
              <div className="radioInput">
                <input
                  type="radio"
                  id="work"
                  name="addressType"
                  value="WORK"
                  checked={newAddress.addressType === "WORK"}
                  onChange={handleChange}
                  required={true}
                />
                <label htmlFor="work">Work</label>
              </div>
            </div>
          </div>
          <span style={{ color: "red" }}>{error}</span>
          <div className="addressFormInputs">
            <button type="submit">Save</button>
            <button type="reset" onClick={() => {setIsAddingNewAddress(false); }}>Cancel</button>
          </div>
        </form>
  )
}

export default AddressForm
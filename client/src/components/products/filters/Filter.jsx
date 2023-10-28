import React, { useContext, useEffect, useState } from 'react'
import "./filter.css";
import { URLContext } from '../../../context/URLContext';

function Filter({isFilterVisible}) {
    const {URLState,URLDispatch} = useContext(URLContext);

    function handleClick(e){
        URLDispatch({
            type:e.target.name,
            payload:e.target.value
        });
    }
    const setFilterStyle = {
        display:"flex",
        height:"100%",
    }
  return (
    <div className="filter" style={(window.innerWidth<=650 && isFilterVisible )?setFilterStyle:{}}>
        <div className="genders">
            <span>GENDER</span>
        <div className="gender">
            <input type="radio" name="gender" id="men" value={"men"} checked = {URLState.gender === "men"} onChange={handleClick} />
            <label htmlFor="men" name="gender">Men</label>
        </div>
        <div className="gender">
            <input type="radio" name="gender" id="women" value={"women"} checked = {URLState.gender === "women"} onChange={handleClick} />
            <label htmlFor="women">Women</label>
        </div>
        </div>
        <div className="categories">
            <span>CATEGORIES</span>
            <div className="category">
                <input type="radio" name="category" id="clothing" value="clothing" checked = {URLState.category === "clothing"}
                 onChange={handleClick}/>
                <label htmlFor="clothing">Clothing</label>
            </div>
            <div className="category">
                <input type="radio" name="category" id="footwear" value="footwear" checked = {URLState.category === "footwear"}
                 onChange={handleClick}/>
                <label htmlFor="footwear">Footwear</label>
            </div>
            <div className="category">
                <input type="radio" name="category" id="perfume" value="perfume" onChange={handleClick}
                checked = {URLState.category === "perfume"} />
                <label htmlFor="perfume">Perfumes</label>
            </div>
            <div className="category">
                <input type="radio" name="category" id="home-decorations" value="home decorations"
                checked = {URLState.category === "home decorations"} onChange={handleClick} />
                <label htmlFor="home-decorations">Home Decor</label>
            </div>
            <div className="category">
                <input type="radio" name="category" id="bags" value="bags" onChange={handleClick} 
                checked = {URLState.category === "bags"}/>
                <label htmlFor="bags">Bags & BackPacks</label>
            </div>
        </div>
    </div>
  )
}
export  function Sort(){
        return(
            <div className="sort">
            <label htmlFor="price">Sort:</label>
            <select name="price" id="price">
                <option value=""><strong>Recommended</strong></option>
                <option value="-1">Price: High to Low</option>
                <option value="1">Price: Low to High</option>
            </select>
        </div>
        )
}

export default Filter
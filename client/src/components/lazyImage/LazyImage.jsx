import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({src, alt,id, handleClick,onLoad}) => {
    const ref = useRef()
    const [inview,setInview] = useState(false);
    let callback = (entries)=>{
        entries.forEach(element => {
            if(element.isIntersecting){
                setInview(true)
            }
        });
    }
    useEffect(() => {
        let observer = new IntersectionObserver(callback);
        if(ref?.current){
            observer.observe(ref?.current);
        }
        return (()=>{
            ref.current && observer.unobserve(ref.current);
        })
    }, []);

    return (
        inview? <img id={id} src = {src} alt={alt} onClick={handleClick && handleClick}
        onLoad={onLoad && onLoad}/>
        :
        <img
            src=""
            alt=""
            id={id}
            ref={ref} 
            style={{width: "250px",
            minHeight: "278px",
            borderRadius: "20px",
            // boxShadow: "5px -5px 5px #bbbbbb"
        }}
        />
    );
};

export default LazyImage;

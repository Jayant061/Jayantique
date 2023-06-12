import React from 'react'
import testimonialData from "../../assets/testimonialData.json";
import quoteIcon from "../../assets/quote.svg";
import starIcon from  "../../assets/star.svg";
function Testimonial() {
  const reviews = testimonialData?.map((review,index)=>{
    return(
      <div className="review" key={index}>
        
        <div className="quotation">
          <img src={quoteIcon} alt="Quotation mark" />
        </div>

        <div className="comment">
        <span>{review?.review}</span>
        </div>
        
        <div className="author">
          <div className="rating">
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
            <img src={starIcon} alt="" />
          </div>
        <img src={review?.img} alt="user image" className='userImage'/>
        <span className='userName'>{review?.name}</span>
        </div>

      </div>
    )
  })
  return (
    <div className='testimonial'>
        <span className='testimonialHeading'>Testimonial</span>
        <div className="reviews">
          {reviews}
        </div>
    </div>
  )
}

export default Testimonial
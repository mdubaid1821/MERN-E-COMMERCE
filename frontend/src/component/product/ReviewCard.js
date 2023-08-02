import React from 'react'
import { Rating } from "@material-ui/lab";
import profile from "../../images/profilepic.png"

const ReviewCard = ({reviews}) => {
  
  const options = {
    value: reviews.rating,
    readOnly: true,
    precision: 0.5,
  };
  return <div className='reviewCard'>
    <img src={profile} alt='user' />
    <p>{reviews.name}</p>
    <Rating {...options} style={{color:"goldenrod"}}/>
    <span>{reviews.comment}</span>
  </div>
}

export default ReviewCard
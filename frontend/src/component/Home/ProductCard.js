import React from 'react';
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productcard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <Rating {...options} style={{color:"gold"}}/>
      <span>({product.numOfReviews} Reviews)</span>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;

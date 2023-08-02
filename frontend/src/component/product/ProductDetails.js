import React, { Fragment, useEffect, useState,  } from "react";
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import './productDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData";
import { addToCart } from "../../actions/cartActions";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from  "@material-ui/core"
import { Rating } from "@material-ui/lab";



const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert()


  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );




  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };


const [Quantity, setQuantity] = useState(1)
const [open, setOpen] = useState(false);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");




const decreaseQuantity = () =>{
  if(Quantity   >= 1) return
  const dec = Quantity - 1
  setQuantity(dec)
}

const increaseQuantity = () =>{

  if(product.stock <= Quantity) return
  const inc = Quantity + 1
  setQuantity(inc)
}


  const addToCartHandler = () => {
    dispatch(addToCart(id , Quantity))
    alert.success("Item added to cart")
  }


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };




  useEffect(() => {

    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id , alert , error, success, reviewError]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ):(
        <Fragment>
          <MetaData title={`${product.name} -- E-COMMERCE`} />
      <div className="ProductDetails">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel> 
          </div>
        )}
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
          <Rating{...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={Quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>
                Add to Cart
              </button>
              </div>
              <p>
                Status:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button className="submitReview"  onClick={submitReviewToggle}>Submit Review</button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} reviews={review} />)}
        </div>
      ) : (
        <p className="noreviews">NO REVIEWS YET</p>
      )}
    </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

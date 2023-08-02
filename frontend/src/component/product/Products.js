import React, { Fragment, useState } from 'react';
import "./Products.css"
import {useDispatch, useSelector} from "react-redux";
import {clearErrors,getProduct} from "../../actions/productAction"
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { useEffect } from 'react';
import {useParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import {Typography} from "@material-ui/core";
import { Slider } from '@mui/material';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';


const Products = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage , setCurrentPage] = useState(1);
    const [price , setPrice] = useState([100,500000]);

    const {products , loading , error , productsCount, resultPerPage} = useSelector((state) => state.products)
    const {keyword} = useParams();

    const setCurrentPageNo = (event, page) => {
      setCurrentPage(page);
      dispatch(getProduct(keyword, page));
    };

    const priceHandler = (event , newPrice) =>{
      setPrice(newPrice);
    }
    

    const totalPageCount = Math.ceil(productsCount / resultPerPage)
    


    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }

      dispatch(getProduct(keyword, currentPage, price));

    }, [dispatch, keyword, currentPage, price, alert, error])
    




  return (
    <Fragment>
        {loading ? (<Loader/>) : (
          <Fragment>
            <MetaData title="PRODUCTS -- E-COMMERCE" />
        
        <h2 className="productHeading">Products</h2>
        <div className="products">
          {products && products.map((product)=>(<ProductCard key={product._id} product={product} />))}
        </div>


        <div className="filterBox">
          <Typography>price</Typography>
          <Slider 
          getAriaValueText={(value) => `value: ${value}`}
          value={price}
          onChange={priceHandler}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          min={100}
          max={500000}
          color='secondary'
          size='small'
          disableSwap= {true}

          />

    

        </div>
        

        <div className="paginationBox">
          <Pagination
          page = {currentPage}
          itemscountperpage = {10}
          count={totalPageCount}
          boundaryCount={1}
          siblingCount={0}
          onChange = {setCurrentPageNo}
          
          />
        </div>
        
        </Fragment>
        )}
        
    </Fragment>
  )
    
  
}

export default Products
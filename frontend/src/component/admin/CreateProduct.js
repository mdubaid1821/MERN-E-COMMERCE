
import React, { Fragment , useState, useEffect} from 'react';
import "./CreateProduct.css"
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import {useDispatch , useSelector} from "react-redux";
import { clearErrors, createProduct } from '../../actions/productAction';
import {useAlert} from "react-alert"
import { useNavigate} from 'react-router-dom';
import { Button } from "@material-ui/core";
import SideBar from './SideBar'
import {MdAccountTree, MdOutlineDescription, MdAttachMoney} from "react-icons/md"
import {GrStorage} from "react-icons/gr"
import {FaSpellCheck} from "react-icons/fa"
import {AiFillFileAdd} from "react-icons/ai"




const CreateProduct = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const {loading, error, success} = useSelector((state)=>state.createProduct)


    const [name , setName] = useState("")
    const [price , setPrice] = useState("")
    const [description , setDescription] = useState("")
    const [category , setCategory] = useState("")
    const [stock , setStock] = useState("")
    const [images , setImages] = useState([])
    const [imagesPreview , setImagesPreview] = useState([])

    const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Sports", "Toys"];





    const createFormSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image)=>{
            myForm.append("images", image)
        })

        dispatch(createProduct(myForm));
      };

      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([])
        setImagesPreview([])

        files.forEach((file)=>{
            const reader = new FileReader()

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImages((old) => [...old, reader.result])
                    setImagesPreview((old) => [...old, reader.result])
                }
            }




            reader.readAsDataURL(file)
        })
      }

      

      useEffect(() => {
        if(error){
          alert.error(error);
          dispatch(clearErrors())
        }
        if(success){
            alert.success("Product Created Successfully")
          navigate("/admin/dashboard")
        }
      }, [dispatch, error, alert, navigate, success])


  return (
    <Fragment>
    {loading ? <Loader />:(
        <Fragment>
        <MetaData title="CreateProduct -- E-COMMERCE" />
        
           <div className="main">
           <div className="dashboard">
                <SideBar />

                <div className="createProductContainer">
                <form className="createProductForm" encType='multipart/form-data' onSubmit={createFormSubmitHandler}>

                    <h1>Create Product</h1>
                    
                    <div className="createProductName">
                        <FaSpellCheck />
                        <input type="text" placeholder='Enter product Name' required value={name} onChange={(e)=> setName(e.target.value)} />

                    </div>
                    
                    <div className="createProductEmail">
                        <MdAttachMoney />
                        <input type="number" placeholder='Enter Product Price' required onChange={(e) => setPrice(e.target.value)} />

                    </div>
                    <div className="createProductPassword">
                        <MdOutlineDescription />
                        <textarea placeholder='Enter Product Description' required  value={description} onChange={(e) => setDescription(e.target.value)} cols={"30"} rows={"1"}></textarea>
                    </div>
                    <div className="createProductPassword">
                        <MdAccountTree />
                        <select onChange={(e) => setCategory(e.target.value)}> <option value="">Choose Category</option> {categories.map((item)=>(
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))} </select>
                    </div>
                    <div className="createProductEmail">
                        <GrStorage />
                        <input type="number" placeholder='Enter Product Stock' required onChange={(e) => setStock(e.target.value)} />

                    </div>

                    <div className="createProductFormFile">
                        <AiFillFileAdd />
                        <input type='file' name='avatar' accept='image/*' multiple onChange={createProductImagesChange}/>
                    </div>
                        
                    <div className="createProductFormImage">
                        {
                            imagesPreview.map((image, index) =>{
                                return <img key={index} src={image} alt='product preview' />
                            })
                        }
                    </div>

                    <Button id='createProductBtn' type='submit' disabled={loading ? true: false}>Create</Button>

                </form>
                </div>
            </div>
                
           </div>
           
        
       
    </Fragment>
    )}
</Fragment>
  )
}

export default CreateProduct
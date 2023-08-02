import React, { Fragment, useEffect } from 'react'
import SideBar from "./SideBar.js"
import "./Dashboard.css"
import { Link } from 'react-router-dom'
import {Doughnut, Line} from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProducts } from '../../actions/productAction.js'
import Loader from '../layout/Loader/Loader.js'
import MetaData from '../layout/MetaData.js'
Chart.register(...registerables);



const Dashboard = () => {


    const {products} = useSelector((state)=> state.products)
    const {orders} = useSelector((state)=> state.adminOrders)
    const {users} = useSelector((state)=> state.allUsers)

    const dispatch = useDispatch()

    let outOfStock = 0;

    products && products.forEach((item)=>{
        if(item.stock === 0){
            outOfStock +=1;
        }
    })


    let totalAmount = 0
    orders && orders.forEach(item=>{
        totalAmount += item.totalPrice
    })



    
    useEffect(() => {
     
        dispatch(getAdminProducts())
    }, [dispatch])
    




    const lineState = {
        labels:["Initial Amount", "Final Amount"],
        datasets:[
            {
                label: "Total Amount",
                backgroundColor: ["green"],
                hoverBackgroundColor: ["red"],
                data:[0, totalAmount],
            }
        ]
    }



    const doughnutState = {
        labels:["outOfStock" , "inStock"],
        datasets:[
            {
                backgroundColor:["red", "green"],
                hoverBackgroundColor:["purple", "blue"],
                data:[outOfStock, products.length - outOfStock]
            }
        ]
    }









  return (
    <Fragment>
    <MetaData title={"DASHBOARD  E-COMMERCE"} />
    <div className="main">
    <div className='dashboard'>
    <SideBar />

    <div className="dashboardContainer">

        <h6 className='dashboardHeading'>DASHBOARD</h6>

        {products && users && orders ? 
        <Fragment>
        <div className="dashboardBox2">
        <Link to={"/admin/products"}>
            <p>Products</p>
            <p>{products && products.length}</p>
        </Link>

        <Link to={"/orders/all"}>
            <p>Orders</p>
            <p>{orders.length}</p>
        </Link>

        <Link to={"/admin/users"}>
            <p>Users</p>
            <p>{users.length}</p>
        </Link>
    </div>
    </Fragment> : (<Loader/>)}
        <div className="charts">
        <div className="chart">
            <Line data={lineState} color='black' />

        </div>

        <div className="dchart">
            <Doughnut data={doughnutState} />
        </div>
        </div>
        
    </div>

    </div>
</div>
</Fragment>
   
        
  )
}

export default Dashboard
import React, { Fragment } from 'react'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAlert, } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import "./UserList.css"
import SideBar from './SideBar'
import {FiEdit2} from "react-icons/fi"
import {AiFillDelete} from "react-icons/ai"
import {DataGrid} from "@material-ui/data-grid"
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
import { allUser, deleteUser, clearErrors } from '../../actions/userActions'







const UserList = () => {


  const {loading , users, error} = useSelector((state) => state.allUsers)

  const {error:deleteError, success} = useSelector((state)=>state.deleteUser)

  const navigate = useNavigate()

  const alert = useAlert()

  const dispatch = useDispatch()

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }
    



  const columns = [
    {field:"id" , headerName:"User ID", minWidth: 200, flex: 1.5 },
    {
      field: "name",
      headerName:"Name",
      minWidth:100,
      flex:1
    },
    {
      field: "email",
      headerName:"Email",
      minWidth:50,
      flex:1.2
    },
    {
      field: "role",
      headerName:"Role",
      minWidth:50,
      flex:1,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName:"Actions",
      type: "number",
      minWidth:100,
      flex:1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <FiEdit2 />
            </Link>

            <Button onClick={() => {deleteUserHandler(params.getValue(params.id, "id"))}}>
              <AiFillDelete />
            </Button>
          </Fragment>
        );
      },
    },
    
  ]


  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });





  useEffect(() => {
    
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if(success){
      alert.success("User Deleted Successfully")
      navigate("/admin/users")
    }

    dispatch(allUser())


  }, [alert, error, dispatch, deleteError, success, navigate ])
  



  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={"ADMIN-USERS"} />

         <div className="main">
         <div className="dashboard">
            <SideBar/>
          


          <div className="UserListContainer">
            <h1 className="heading">ALL USERS</h1>

            <DataGrid
            columns={columns}
            rows={rows}
            autoHeight
            disableSelectionOnClick
            pageSize={8}
            className='UserListTable'
            />
          </div>
          </div>
         </div>


        </Fragment>
      )}
    </Fragment>
  )
}


export default UserList
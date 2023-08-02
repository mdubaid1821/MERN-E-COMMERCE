import React from 'react'
import "./SideBar.css"
import logo from "../../images/logo.png"
import {Link} from "react-router-dom"
import {TreeView, TreeItem} from "@material-ui/lab"
import {FcExpand} from "react-icons/fc"
import {MdPostAdd} from "react-icons/md"
import {CgAddR} from "react-icons/cg"
import {TbLayoutNavbarCollapse} from "react-icons/tb"
import {TfiViewListAlt} from "react-icons/tfi"
import {MdSpaceDashboard} from "react-icons/md"
import {IoIosPeople} from "react-icons/io"








const SideBar = () => {
  return (
    <div className='sidebar'>
        <Link to={"/"}>
            <img src={logo} alt="Loading" />
        </Link>

        <Link to={"/admin/dashboard"}>
            <p> <MdSpaceDashboard /> Dashboard</p>
        </Link>

        <Link>
        
         <TreeView defaultCollapseIcon={<TbLayoutNavbarCollapse />} defaultExpandIcon={<FcExpand />} >
            <TreeItem nodeId='1' label="Products">
                <Link to={"/admin/products"}>
                    <TreeItem nodeId='2' label="All" icon={<MdPostAdd />} />
                </Link>

                <Link to={"/admin/product/new"}>
                    <TreeItem nodeId='3' label="create" icon={<CgAddR />} />
                </Link>
     
            </TreeItem>
         </TreeView>
          </Link>

          <Link to={"/orders/all"}>
                    <p> <TfiViewListAlt /> Orders</p>
                </Link>

                <Link to={"/admin/users"}>
                    <p> <IoIosPeople /> Users</p>
                </Link>
    </div>
  )
}

export default SideBar
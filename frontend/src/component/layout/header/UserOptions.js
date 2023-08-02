import React, { Fragment, useState } from 'react';
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { MdDashboard } from "react-icons/md";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { FaListAlt } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userActions';
import { Backdrop } from '@material-ui/core';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <BsFileEarmarkPersonFill />, name: "Profile", func: account },
    { icon: <FaListAlt />, name: "Orders", func: orders },
    { icon: <MdShoppingCartCheckout style={{ color: cartItems.length > 0 ? "crimson" : "unset" }} />, name: `${cartItems.length} Items Awaiting`, func: cart },
    { icon: <ImExit />, name: "Logout", func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({ icon: <MdDashboard />, name: "Dashboard", func: dashboard });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function account() {
    navigate("/account");
  }

  function orders() {
    navigate("/orders/my");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logged Out Successfully");
    navigate("/");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "9" }} />
      <SpeedDial
        ariaLabel='speeddial ex'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        style={{ zIndex: "11" }}
        className='speedDial'
        icon={<img className='speedDialIcon' src={user?.avatar?.url ? user.avatar.url : "profile.jpg"} alt='profile' />}
      >
        {options.map((option, index) => (
          <SpeedDialAction key={index} icon={option.icon} tooltipTitle={option.name} tooltipOpen={window.innerWidth <= 600 ? true : false} onClick={option.func} />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;

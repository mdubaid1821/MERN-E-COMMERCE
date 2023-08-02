import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import {SlLogin} from "react-icons/sl"
import {LuSearch} from "react-icons/lu"
import {FiShoppingCart} from "react-icons/fi"



const options = {
  burgerColor: "black",
  burgerColorHover: "white",
  navColor1: "crimson",
  navColor2: "crimson",
  navColor3: "black",
  navColor4: "black",
  logo,
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact Me",
  link4Text: "About Me",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "2vmax",
  link1Family: "Roboto",
  link1ColorHover: "white",
  link3Color: "white",
  link4Color: "white",
  link3ColorHover: "crimson",
  link4ColorHover: "crimson",
  link1Margin: "2px",
  link1Padding: "7px",
  SearchIconElement: LuSearch,
  searchIcon: true,
  cartIcon: true,
  CartIconElement: FiShoppingCart,
  profileIcon: true,
  ProfileIconElement: SlLogin,
  searchIconMargin: "10px",
  cartIconMargin: "10px",
  profileIconMargin: "10px",
  searchIconUrl: "/search",
  cartIconUrl: "/cart",
  profileIconUrl: "/login",
  searchIconSize: "3vmax",
  cartIconSize: "3vmax",
  profileIconSize: "3vmax",
  searchIconColor: "white",
  cartIconColor: "white",
  profileIconColor: "white",
  searchIconColorHover: "crimson",
  cartIconColorHover: "crimson",
  profileIconColorHover: "crimson",
  searchIconTransition:	0.5,
  cartIconTransition:	0.5,
  profileIconTransition:	0.5,



}



export const Header = () => {
  return <ReactNavbar{...options} />;
};

import React, { useContext } from "react";
import NavBar from "./nav-bar";
import Blur from "./blur";
import CartView from "../cart-view/cart-view";
import DisplayContext from "../../context/display-context";
import styles from "../../styles/layout.module.css";
import imageHeader from "../../public/Slider-Home.png";
import Image from "next/image";
const Layout = ({ children }) => {
  const { cartView } = useContext(DisplayContext);

  return (
    <div className={cartView ? styles.noscroll : null}>
      <CartView />
      <Blur />
      <NavBar />
      <header>
        <Image src={imageHeader} alt="Header Image" />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BiShoppingBag } from "react-icons/bi";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import MedusaLogo from "../../public/medusa-logo.svg";
import styles from "../../styles/nav-bar.module.css";
import { quantity, sum } from "../../utils/helper-functions";

export const NavBar = () => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);
  const [isCheckout, setIsCheckout] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/checkout" || router.pathname === "/payment") {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [router.pathname]);

  return (
    <Navbar className={`position-fixed ` + styles.nav_bar} expand="lg">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <a style={{ width: "125px" }}>
              <Image src={MedusaLogo} height="20px" width="100%" alt="logo" />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.collapse}>
          <Nav className="me-auto">
            <Nav.Link href="#home">Uñas</Nav.Link>
            <Nav.Link href="#features">SPA y Cuerpo</Nav.Link>
            <Nav.Link href="#pricing">Pestañas</Nav.Link>
            <Nav.Link href="#pricing">Catalogo</Nav.Link>
            <Nav.Link href="#pricing">Blog</Nav.Link>
            <Nav.Link href="#pricing">Nosotros</Nav.Link>
            <Nav.Link href="#pricing">Contáctanos</Nav.Link>
          </Nav>
          {!isCheckout ? (
            <button
              className={styles.btn}
              onClick={() => updateCartViewDisplay()}
              type="button"
            >
              <BiShoppingBag />
              <span>
                {cart.items.length > 0
                  ? cart.items.map(quantity).reduce(sum)
                  : 0}
              </span>
            </button>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

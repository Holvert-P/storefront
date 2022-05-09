import React, { useContext, useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import StoreContext from "../../context/store-context";
import styles from "../../styles/Button.module.css";
import { formatPrice, resetOptions } from "../../utils/helper-functions";

const ButtonAdd = ({ product }) => {
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  });

  const { addVariantToCart } = useContext(StoreContext);
  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product));
    }
  }, [product, setOptions]);

  const handleAddToBag = () => {
    addVariantToCart({
      variantId: options.variantId,
      quantity: options.quantity,
    });
    if (product) setOptions(resetOptions(product));
  };
  return (
    <button className={styles.addbtn} onClick={() => handleAddToBag()}>
      <span>Add to bag</span>
      <BiShoppingBag />
    </button>
  );
};

export default ButtonAdd;

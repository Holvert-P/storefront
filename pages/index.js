import { useContext, useState } from "react";
import CardProduct from "../components/CardProduct";
import StoreContext from "../context/store-context";
import styles from "../styles/home.module.css";
import { createClient } from "../utils/client";

export default function Home({ products }) {
  const { addVariantToCart, cart } = useContext(StoreContext);

  return (
    <>
      <section className={styles.main}>
        <div className={styles.products}>
          <h2>Productos Recientes</h2>
          <div className={styles.grid}>
            {products &&
              products.map((p) => {
                return <CardProduct p={p} cart={cart} key={p.id} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};

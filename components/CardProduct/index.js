import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonAdd from "../button";
import styles from "../../styles/CardProduct.module.css";
import { formatPrices } from "../../utils/prices";
const CardProduct = ({ cart, p }) => {
  return (
    <article key={p.id} className={styles.card}>
      <Link href={{ pathname: `/product/[id]`, query: { id: p.id } }} passHref>
        <a>
          <div>
            <Image
              src={p.images[0].url}
              alt={p.name}
              width={200}
              height={200}
            />
            <h2 className={styles.card_text}>{p.title}</h2>
            <p className={styles.card_text}>
              {formatPrices(cart, p.variants[0])}
            </p>
          </div>
        </a>
      </Link>
      <ButtonAdd product={p} />
    </article>
  );
};

export default CardProduct;

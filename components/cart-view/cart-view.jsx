import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import styles from "../../styles/cart-view.module.css";
import { formatPrice, quantity, sum } from "../../utils/helper-functions";
import { formatPrices } from "../../utils/prices";

const CartView = () => {
  const { cartView, updateCartViewDisplay, updateCheckoutStep } =
    useContext(DisplayContext);
  const { cart, currencyCode, updateLineItem, removeLineItem } =
    useContext(StoreContext);
  const router = useRouter();

  return (
    <div className={`${styles.container} ${cartView ? styles.active : null}`}>
      <div className={styles.top}>
        <p>Carrito</p>
        <p>
          {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
          {cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
            ? "articulo"
            : "articulos"}
        </p>
      </div>
      <div className={styles.overview}>
        {cart.items
          .sort((a, b) => {
            const createdAtA = new Date(a.created_at),
              createdAtB = new Date(b.created_at);

            if (createdAtA < createdAtB) return -1;
            if (createdAtA > createdAtB) return 1;
            return 0;
          })
          .map((i) => {
            return (
              <div key={i.id} className={styles.product}>
                <figure onClick={() => updateCartViewDisplay()}>
                  <Link
                    href={{
                      pathname: `/product/[id]`,
                      query: { id: i.variant.product.id },
                    }}
                    passHref
                  >
                    <a>
                      <div className={styles.placeholder}>
                        <Image
                          objectFit="cover"
                          height="100%"
                          width="100%"
                          src={i.variant.product.thumbnail}
                          alt={`${i.title}`}
                        />
                      </div>
                    </a>
                  </Link>
                </figure>
                <div className={styles.controls}>
                  <div>
                    <div>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: i.variant.product.id },
                        }}
                        passHref
                      >
                        <a>{i.title}</a>
                      </Link>
                      <p className={styles.size}>Tamaño: {i.variant.title}</p>
                      <p className={styles.size}>
                        Precio: {formatPrices(cart, i.variant)}
                      </p>
                    </div>
                    <div>
                      <div className={styles.mid}>
                        <div className={styles.selector}>
                          <button
                            className={styles.qtybtn}
                            onClick={() =>
                              updateLineItem({
                                lineId: i.id,
                                quantity: i.quantity - 1,
                              })
                            }
                          >
                            {"–"}
                          </button>
                          <p className={styles.ticker}>{i.quantity}</p>
                          <button
                            className={styles.qtybtn}
                            onClick={() =>
                              updateLineItem({
                                lineId: i.id,
                                quantity: i.quantity + 1,
                              })
                            }
                          >
                            {"+"}
                          </button>
                        </div>
                      </div>
                      <p>{}</p>
                    </div>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeLineItem(i.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.subtotal}>
        <p>Subtotal</p>
        <span>
          {cart.region ? formatPrice(cart.subtotal, currencyCode) : 0}
        </span>
      </div>
      <div className={styles.bottom}>
        <button
          className={styles.checkoutbtn}
          onClick={() => {
            updateCheckoutStep(1);
            updateCartViewDisplay();
            router.push("/checkout");
          }}
          disabled={cart.items.length < 1 ? true : false}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartView;

// import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProductOrder } from "../../selectors/select-product-order";
import { removeProductFromCart } from "../../actions/remove-product-from-cart";
import { getTotalPrice } from "../../utils/utils";
// import { AmountCounter } from "../../components/Layout/AmountCounter/AmountCounter";
import { addProductToCart } from "../../actions/add-product-to-cart";
import { cleanCart } from "../../actions/clean-cart";

export const Cart = () => {
    const currentOrder = useSelector(selectProductOrder);
    const dispatch = useDispatch();

    const totalPrice = getTotalPrice(currentOrder);

    const handleDelete = (id) => {
        dispatch(removeProductFromCart(id));
    };

    const decreaceProductAmount = (id) => {
        dispatch(cleanCart());
        const changedOrderAmount = currentOrder.map((elem) => {
            if (elem.id === id && elem.amount !== 0) {
                elem.amount -= 1;
            }
            dispatch(addProductToCart(elem));
            if (elem.amount === 0) {
                dispatch(removeProductFromCart(id));
                // handleDelete(id)
            }

            return elem;
        });
    };
    
    const increaceProductAmount = (id) => {
        dispatch(cleanCart());
        const changedOrderAmount = currentOrder.map((elem) => {
            if (elem.id === id) {
                elem.amount += 1;
            }
            dispatch(addProductToCart(elem));
            return elem;
        });
    };

    return (
        <div className="container indent">
            <h1 className={styles.cart_title}>Your order:</h1>
            <div className={styles.wrapper}>
                <div className={styles.items_wrapper}>
                    {currentOrder.length ? (
                        currentOrder.map((order, i) => (
                            <div key={i} className={styles.cart_item}>
                                <img
                                    className={styles.cart_img}
                                    src={order.src}
                                    alt="pizza image"
                                />
                                <div className={styles.cart_item_info}>
                                    <h3 className={styles.order_name}>
                                        {order.name}
                                    </h3>
                                    <p>{order.description}</p>
                                    <div className={styles.amount}>
                                        <p
                                            className={styles.decreace}
                                            onClick={() =>
                                                decreaceProductAmount(order.id)
                                            }
                                        >
                                            –
                                        </p>
                                        <p>{order.amount}</p>
                                        <p
                                            className={styles.increace}
                                            onClick={() =>
                                                increaceProductAmount(order.id)
                                            }
                                        >
                                            +
                                        </p>
                                    </div>
                                    <p>Amount: {order.amount}</p>
                                    <p>Price: {order.price}</p>
                                    <div
                                        className={`${styles.modif_btn} button`}
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                        ></i>
                                        Delete
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>Your cart is empty</>
                    )}
                </div>
                <div className={styles.total_orderinfo}>
                    {currentOrder.length ? (
                        <>
                            <h2 className={styles.total_price_text}>
                                total price: {totalPrice} ₽
                            </h2>
                            <div className={`button ${styles.buy_btn}`}>
                                <i
                                    className="fa fa-credit-card"
                                    aria-hidden="true"
                                ></i>
                                Buy
                            </div>
                            <div
                                className={`button ${styles.delete_btn}`}
                                onClick={() => dispatch(cleanCart())}
                            >
                                <i
                                    className="fa fa-trash-o"
                                    aria-hidden="true"
                                ></i>
                                Delete order
                            </div>
                        </>
                    ) : (
                        <h2>total price: 0 ₽</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

import { useState } from "react";
import styles from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProductOrder } from "../../selectors/select-product-order";
import { selectCurrentUser } from "../../selectors/select-current-user";
import { removeProductFromCart } from "../../actions/remove-product-from-cart";
import { cleanCart } from "../../actions/clean-cart";
import { getTotalPrice } from "../../utils/utils";
import { addProductToCart } from "../../actions/add-product-to-cart";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../../config";
import { updateOrderQuantity } from "../../utils/cartUtils";
import { processOrder } from "../../utils/cartUtils";

export const Cart = () => {
    const navigate = useNavigate();
    const currentOrder = useSelector(selectProductOrder);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const totalPrice = getTotalPrice(currentOrder);

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleDelete = (id) => {
        dispatch(removeProductFromCart(id));
    };

    const decreaceProductAmount = (id) => {
        const updatedOrder = updateOrderQuantity(currentOrder, id, -1);
        if (updatedOrder.find((item) => item.id === id)?.amount === 0) {
            dispatch(removeProductFromCart(id));
        }
        dispatch(cleanCart());
        updatedOrder.forEach((item) => {
            if (item.amount > 0) dispatch(addProductToCart(item));
        });
    };

    const increaceProductAmount = (id) => {
        const updatedOrder = updateOrderQuantity(currentOrder, id, 1);
        dispatch(cleanCart());
        updatedOrder.forEach((item) => dispatch(addProductToCart(item)));
    };

    const handleBuy = async () => {
        if (!currentUser.login) {
            setModalMessage(
                "Пожалуйста, авторизуйтесь или зарегистрируйтесь для оформления заказа."
            );
            setModalVisible(true);
            return;
        }

        try {
            const orderDetails = {
                user: {
                    username: currentUser.login,
                    email: currentUser.email,
                },
                order: currentOrder,
                totalPrice,
            };
            await processOrder(orderDetails, API_HOST);
            setModalMessage(
                "Заказ принят в обработку. Вам выслано письмо с подтверждением заказа."
            );
            dispatch(cleanCart());
        } catch (error) {
            console.error("Error processing order:", error);
            setModalMessage(
                "Не удалось оформить заказ. Попробуйте позже."
            );
        } finally {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalMessage("");
        navigate("/authorization");
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
                            <div
                                className={`button ${styles.buy_btn}`}
                                onClick={handleBuy}
                            >
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

            {isModalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <p>{modalMessage}</p>
                        <button
                            className={`button ${styles.close_btn}`}
                            onClick={closeModal}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

import { useState } from "react";
import styles from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectProductOrder } from "../../selectors/select-product-order";
import { selectCurrentUser } from "../../selectors/select-current-user";
import { removeProductFromCart } from "../../actions/remove-product-from-cart";
import { cleanCart } from "../../actions/clean-cart";
import { getTotalPrice } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { decreaceProductAmount, increaceProductAmount } from "../../actions/cart-actions";
import { handleBuy } from "../../actions/order-actions";
import { Button } from "../../components/Layout/UI/Button/Button";

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

    const decreaceAmount = (id) => {
        dispatch(decreaceProductAmount(id));
    };

    const increaceAmount = (id) => {
        dispatch(increaceProductAmount(id));
    };

    const handleBuyClick = async () => {
        if (!currentUser.login) {
            setModalMessage(
                "Пожалуйста, авторизуйтесь или зарегистрируйтесь для оформления заказа."
            );
            setModalVisible(true);
            return;
        }

        try {
            await dispatch(
                handleBuy(currentUser, currentOrder, totalPrice, setModalMessage, setModalVisible)
            );
        } catch (error) {
            console.error("Ошибка оформления заказа:", error);
            setModalMessage("Не удалось оформить заказ. Попробуйте позже.");
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
                                            onClick={() => decreaceAmount(order.id)}
                                        >
                                            –
                                        </p>
                                        <p>{order.amount}</p>
                                        <p
                                            className={styles.increace}
                                            onClick={() => increaceAmount(order.id)}
                                        >
                                            +
                                        </p>
                                    </div>
                                    <p>Amount: {order.amount}</p>
                                    <p>Price: {order.price}</p>
                                    <Button
                                        className={`${styles.modif_btn} button`}
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                        ></i>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className={styles.empty_message}>Your cart is empty...</p>
                            <br></br>
                            <Button className={styles.main_page_btn} onClick={() => navigate("/")}>Main page</Button>
                        </div>
                    )}
                </div>
                <div className={styles.total_orderinfo}>
                    {currentOrder.length ? (
                        <>
                            <h2 className={styles.total_price_text}>
                                total price: {totalPrice} ₽
                            </h2>
                            <Button
                                className={`button ${styles.buy_btn}`}
                                onClick={handleBuyClick}
                            >
                                <i
                                    className="fa fa-credit-card"
                                    aria-hidden="true"
                                ></i>
                                Buy
                            </Button>
                            <Button
                                className={`button ${styles.delete_btn}`}
                                onClick={() => dispatch(cleanCart())}
                            >
                                <i
                                    className="fa fa-trash-o"
                                    aria-hidden="true"
                                ></i>
                                Delete order
                            </Button>
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
                        <Button
                            className={`button ${styles.close_btn}`}
                            onClick={closeModal}
                        >
                            OK
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

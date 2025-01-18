// // import { useEffect, useState } from "react";
// import styles from "./Cart.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { selectProductOrder } from "../../selectors/select-product-order";
// import { removeProductFromCart } from "../../actions/remove-product-from-cart";
// import { getTotalPrice } from "../../utils/utils";
// // import { AmountCounter } from "../../components/Layout/AmountCounter/AmountCounter";
// import { addProductToCart } from "../../actions/add-product-to-cart";
// import { cleanCart } from "../../actions/clean-cart";

// export const Cart = () => {
//     const currentOrder = useSelector(selectProductOrder);
//     const dispatch = useDispatch();

//     const totalPrice = getTotalPrice(currentOrder);

//     const handleDelete = (id) => {
//         dispatch(removeProductFromCart(id));
//     };

//     const decreaceProductAmount = (id) => {
//         dispatch(cleanCart());
//         // eslint-disable-next-line no-unused-vars
//         const changedOrderAmount = currentOrder.map((elem) => {
//             if (elem.id === id && elem.amount !== 0) {
//                 elem.amount -= 1;
//             }
//             dispatch(addProductToCart(elem));
//             if (elem.amount === 0) {
//                 dispatch(removeProductFromCart(id));
//                 // handleDelete(id)
//             }

//             return elem;
//         });
//     };
    
//     const increaceProductAmount = (id) => {
//         dispatch(cleanCart());
//         // eslint-disable-next-line no-unused-vars
//         const changedOrderAmount = currentOrder.map((elem) => {
//             if (elem.id === id) {
//                 elem.amount += 1;
//             }
//             dispatch(addProductToCart(elem));
//             return elem;
//         });
//     };

//     return (
//         <div className="container indent">
//             <h1 className={styles.cart_title}>Your order:</h1>
//             <div className={styles.wrapper}>
//                 <div className={styles.items_wrapper}>
//                     {currentOrder.length ? (
//                         currentOrder.map((order, i) => (
//                             <div key={i} className={styles.cart_item}>
//                                 <img
//                                     className={styles.cart_img}
//                                     src={order.src}
//                                     alt="pizza image"
//                                 />
//                                 <div className={styles.cart_item_info}>
//                                     <h3 className={styles.order_name}>
//                                         {order.name}
//                                     </h3>
//                                     <p>{order.description}</p>
//                                     <div className={styles.amount}>
//                                         <p
//                                             className={styles.decreace}
//                                             onClick={() =>
//                                                 decreaceProductAmount(order.id)
//                                             }
//                                         >
//                                             –
//                                         </p>
//                                         <p>{order.amount}</p>
//                                         <p
//                                             className={styles.increace}
//                                             onClick={() =>
//                                                 increaceProductAmount(order.id)
//                                             }
//                                         >
//                                             +
//                                         </p>
//                                     </div>
//                                     <p>Amount: {order.amount}</p>
//                                     <p>Price: {order.price}</p>
//                                     <div
//                                         className={`${styles.modif_btn} button`}
//                                         onClick={() => handleDelete(order.id)}
//                                     >
//                                         <i
//                                             className="fa fa-trash-o"
//                                             aria-hidden="true"
//                                         ></i>
//                                         Delete
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <>Your cart is empty</>
//                     )}
//                 </div>
//                 <div className={styles.total_orderinfo}>
//                     {currentOrder.length ? (
//                         <>
//                             <h2 className={styles.total_price_text}>
//                                 total price: {totalPrice} ₽
//                             </h2>
//                             <div className={`button ${styles.buy_btn}`}>
//                                 <i
//                                     className="fa fa-credit-card"
//                                     aria-hidden="true"
//                                 ></i>
//                                 Buy
//                             </div>
//                             <div
//                                 className={`button ${styles.delete_btn}`}
//                                 onClick={() => dispatch(cleanCart())}
//                             >
//                                 <i
//                                     className="fa fa-trash-o"
//                                     aria-hidden="true"
//                                 ></i>
//                                 Delete order
//                             </div>
//                         </>
//                     ) : (
//                         <h2>total price: 0 ₽</h2>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
// ===========================================================

// import { useState } from "react";
// import styles from "./Cart.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { selectProductOrder } from "../../selectors/select-product-order";
// import { selectCurrentUser } from "../../selectors/select-current-user";
// import { removeProductFromCart } from "../../actions/remove-product-from-cart";
// import { addProductToCart } from "../../actions/add-product-to-cart";
// import { cleanCart } from "../../actions/clean-cart";
// import { getTotalPrice } from "../../utils/utils";

// export const Cart = () => {
//     const currentOrder = useSelector(selectProductOrder);
//     const currentUser = useSelector(selectCurrentUser);
//     const dispatch = useDispatch();

//     const totalPrice = getTotalPrice(currentOrder);

//     // Состояние для модального окна
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [modalMessage, setModalMessage] = useState("");

//     const handleDelete = (id) => {
//         dispatch(removeProductFromCart(id));
//     };

//     const decreaceProductAmount = (id) => {
//         const updatedOrder = currentOrder.map((elem) => {
//             if (elem.id === id) {
//                 if (elem.amount > 1) {
//                     elem.amount -= 1;
//                 } else {
//                     dispatch(removeProductFromCart(id));
//                 }
//             }
//             return elem;
//         });
//         dispatch(cleanCart()); // Сбрасываем корзину
//         updatedOrder.forEach((item) => dispatch(addProductToCart(item))); // Перезаписываем
//     };

//     const increaceProductAmount = (id) => {
//         const updatedOrder = currentOrder.map((elem) => {
//             if (elem.id === id) {
//                 elem.amount += 1;
//             }
//             return elem;
//         });
//         dispatch(cleanCart()); // Сбрасываем корзину
//         updatedOrder.forEach((item) => dispatch(addProductToCart(item))); // Перезаписываем
//     };

//     const handleBuy = () => {
//         if (currentUser.login) {
//             setModalMessage(
//                 "Заказ принят в обработку. Вам выслано письмо с подтверждением заказа."
//             );
//         } else {
//             setModalMessage(
//                 "Пожалуйста, авторизуйтесь или зарегистрируйтесь для оформления заказа."
//             );
//         }
//         setModalVisible(true);
//     };

//     const closeModal = () => {
//         setModalVisible(false);
//         setModalMessage("");
//     };

//     return (
//         <div className="container indent">
//             <h1 className={styles.cart_title}>Your order:</h1>
//             <div className={styles.wrapper}>
//                 <div className={styles.items_wrapper}>
//                     {currentOrder.length ? (
//                         currentOrder.map((order, i) => (
//                             <div key={i} className={styles.cart_item}>
//                                 <img
//                                     className={styles.cart_img}
//                                     src={order.src}
//                                     alt="pizza image"
//                                 />
//                                 <div className={styles.cart_item_info}>
//                                     <h3 className={styles.order_name}>
//                                         {order.name}
//                                     </h3>
//                                     <p>{order.description}</p>
//                                     <div className={styles.amount}>
//                                         <p
//                                             className={styles.decreace}
//                                             onClick={() =>
//                                                 decreaceProductAmount(order.id)
//                                             }
//                                         >
//                                             –
//                                         </p>
//                                         <p>{order.amount}</p>
//                                         <p
//                                             className={styles.increace}
//                                             onClick={() =>
//                                                 increaceProductAmount(order.id)
//                                             }
//                                         >
//                                             +
//                                         </p>
//                                     </div>
//                                     <p>Amount: {order.amount}</p>
//                                     <p>Price: {order.price}</p>
//                                     <div
//                                         className={`${styles.modif_btn} button`}
//                                         onClick={() => handleDelete(order.id)}
//                                     >
//                                         <i
//                                             className="fa fa-trash-o"
//                                             aria-hidden="true"
//                                         ></i>
//                                         Delete
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <>Your cart is empty</>
//                     )}
//                 </div>
//                 <div className={styles.total_orderinfo}>
//                     {currentOrder.length ? (
//                         <>
//                             <h2 className={styles.total_price_text}>
//                                 total price: {totalPrice} ₽
//                             </h2>
//                             <div
//                                 className={`button ${styles.buy_btn}`}
//                                 onClick={handleBuy}
//                             >
//                                 <i
//                                     className="fa fa-credit-card"
//                                     aria-hidden="true"
//                                 ></i>
//                                 Buy
//                             </div>
//                             <div
//                                 className={`button ${styles.delete_btn}`}
//                                 onClick={() => dispatch(cleanCart())}
//                             >
//                                 <i
//                                     className="fa fa-trash-o"
//                                     aria-hidden="true"
//                                 ></i>
//                                 Delete order
//                             </div>
//                         </>
//                     ) : (
//                         <h2>total price: 0 ₽</h2>
//                     )}
//                 </div>
//             </div>

//             {/* Модальное окно */}
//             {isModalVisible && (
//                 <div className={styles.modal}>
//                     <div className={styles.modal_content}>
//                         <p>{modalMessage}</p>
//                         <button
//                             className={`button ${styles.close_btn}`}
//                             onClick={closeModal}
//                         >
//                             OK
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
// = = = = = = = = = = = = = = = = = = = = = = =
// import { useState } from "react";
// import styles from "./Cart.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { selectProductOrder } from "../../selectors/select-product-order";
// import { selectCurrentUser } from "../../selectors/select-current-user";
// import { removeProductFromCart } from "../../actions/remove-product-from-cart";
// import { addProductToCart } from "../../actions/add-product-to-cart";
// import { cleanCart } from "../../actions/clean-cart";
// import { getTotalPrice } from "../../utils/utils";

// export const Cart = () => {
//     const currentOrder = useSelector(selectProductOrder);
//     const currentUser = useSelector(selectCurrentUser);
//     const dispatch = useDispatch();

//     const totalPrice = getTotalPrice(currentOrder);

//     // Состояние для модального окна
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [modalMessage, setModalMessage] = useState("");

//     const handleDelete = (id) => {
//         dispatch(removeProductFromCart(id));
//     };

//     const decreaceProductAmount = (id) => {
//         const updatedOrder = currentOrder.map((elem) => {
//             if (elem.id === id) {
//                 if (elem.amount > 1) {
//                     elem.amount -= 1;
//                 } else {
//                     dispatch(removeProductFromCart(id));
//                 }
//             }
//             return elem;
//         });
//         dispatch(cleanCart()); // Сбрасываем корзину
//         updatedOrder.forEach((item) => dispatch(addProductToCart(item))); // Перезаписываем
//     };

//     const increaceProductAmount = (id) => {
//         const updatedOrder = currentOrder.map((elem) => {
//             if (elem.id === id) {
//                 elem.amount += 1;
//             }
//             return elem;
//         });
//         dispatch(cleanCart()); // Сбрасываем корзину
//         updatedOrder.forEach((item) => dispatch(addProductToCart(item))); // Перезаписываем
//     };

//     const handleBuy = () => {
//         if (currentUser.login) {
//             // Если пользователь авторизован
//             const orderDetails = {
//                 user: {
//                     username: currentUser.login,
//                     email: currentUser.email,
//                 },
//                 order: currentOrder,
//                 totalPrice,
//             };

//             // Отправляем данные на сервер
//             fetch("http://localhost:3000/orders", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(orderDetails),
//             })
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error("Failed to send order");
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     console.log("Order sent successfully:", data);
//                     setModalMessage(
//                         "Заказ принят в обработку. Вам выслано письмо с подтверждением заказа."
//                     );
//                     dispatch(cleanCart()); // Очищаем корзину
//                 })
//                 .catch((error) => {
//                     console.error("Error sending order:", error);
//                     setModalMessage(
//                         "Произошла ошибка при отправке заказа. Попробуйте позже."
//                     );
//                 });
//         } else {
//             // Если пользователь не авторизован
//             setModalMessage(
//                 "Пожалуйста, авторизуйтесь или зарегистрируйтесь для оформления заказа."
//             );
//         }
//         setModalVisible(true);
//     };

//     const closeModal = () => {
//         setModalVisible(false);
//         setModalMessage("");
//     };

//     return (
//         <div className="container indent">
//             <h1 className={styles.cart_title}>Your order:</h1>
//             <div className={styles.wrapper}>
//                 <div className={styles.items_wrapper}>
//                     {currentOrder.length ? (
//                         currentOrder.map((order, i) => (
//                             <div key={i} className={styles.cart_item}>
//                                 <img
//                                     className={styles.cart_img}
//                                     src={order.src}
//                                     alt="pizza image"
//                                 />
//                                 <div className={styles.cart_item_info}>
//                                     <h3 className={styles.order_name}>
//                                         {order.name}
//                                     </h3>
//                                     <p>{order.description}</p>
//                                     <div className={styles.amount}>
//                                         <p
//                                             className={styles.decreace}
//                                             onClick={() =>
//                                                 decreaceProductAmount(order.id)
//                                             }
//                                         >
//                                             –
//                                         </p>
//                                         <p>{order.amount}</p>
//                                         <p
//                                             className={styles.increace}
//                                             onClick={() =>
//                                                 increaceProductAmount(order.id)
//                                             }
//                                         >
//                                             +
//                                         </p>
//                                     </div>
//                                     <p>Amount: {order.amount}</p>
//                                     <p>Price: {order.price}</p>
//                                     <div
//                                         className={`${styles.modif_btn} button`}
//                                         onClick={() => handleDelete(order.id)}
//                                     >
//                                         <i
//                                             className="fa fa-trash-o"
//                                             aria-hidden="true"
//                                         ></i>
//                                         Delete
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <>Your cart is empty</>
//                     )}
//                 </div>
//                 <div className={styles.total_orderinfo}>
//                     {currentOrder.length ? (
//                         <>
//                             <h2 className={styles.total_price_text}>
//                                 total price: {totalPrice} ₽
//                             </h2>
//                             <div
//                                 className={`button ${styles.buy_btn}`}
//                                 onClick={handleBuy}
//                             >
//                                 <i
//                                     className="fa fa-credit-card"
//                                     aria-hidden="true"
//                                 ></i>
//                                 Buy
//                             </div>
//                             <div
//                                 className={`button ${styles.delete_btn}`}
//                                 onClick={() => dispatch(cleanCart())}
//                             >
//                                 <i
//                                     className="fa fa-trash-o"
//                                     aria-hidden="true"
//                                 ></i>
//                                 Delete order
//                             </div>
//                         </>
//                     ) : (
//                         <h2>total price: 0 ₽</h2>
//                     )}
//                 </div>
//             </div>

//             {/* Модальное окно */}
//             {isModalVisible && (
//                 <div className={styles.modal}>
//                     <div className={styles.modal_content}>
//                         <p>{modalMessage}</p>
//                         <button
//                             className={`button ${styles.close_btn}`}
//                             onClick={closeModal}
//                         >
//                             OK
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

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

export const Cart = () => {
    const navigate = useNavigate()
    const currentOrder = useSelector(selectProductOrder);
    const currentUser = useSelector(selectCurrentUser); // Получаем текущего пользователя
    const dispatch = useDispatch();

    const totalPrice = getTotalPrice(currentOrder);

    // Состояние для модального окна
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleDelete = (id) => {
        dispatch(removeProductFromCart(id));
    };

    const decreaceProductAmount = (id) => {
        const updatedOrder = currentOrder.map((item) =>
            item.id === id && item.amount > 1
                ? { ...item, amount: item.amount - 1 }
                : item
        );
        if (updatedOrder.find((item) => item.id === id)?.amount === 1) {
            dispatch(removeProductFromCart(id));
        }
        dispatch(cleanCart());
        updatedOrder.forEach((item) => {
            if (item.amount > 0) dispatch(addProductToCart(item)); 
        });
    };

    const increaceProductAmount = (id) => {
        const updatedOrder = currentOrder.map((item) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
        dispatch(cleanCart());
        updatedOrder.forEach((item) => dispatch(addProductToCart(item)));
    };

    const handleBuy = () => {
        if (currentUser.login) {
            fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: currentUser.login,
                        email: currentUser.email,
                    },
                    order: currentOrder,
                    totalPrice,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to process order.");
                    }
                    return response.json();
                })
                // eslint-disable-next-line no-unused-vars
                .then((data) => {
                    setModalMessage(
                        "Заказ принят в обработку. Вам выслано письмо с подтверждением заказа."
                    );
                    dispatch(cleanCart()); 
                })
                .catch((error) => {
                    console.error("Error processing order:", error);
                    setModalMessage(
                        "Не удалось оформить заказ. Попробуйте позже."
                    );
                });
        } else {
            setModalMessage(
                "Пожалуйста, авторизуйтесь или зарегистрируйтесь для оформления заказа."
            );
        }
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalMessage("");
        navigate("/")
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

            {/* Модальное окно */}
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

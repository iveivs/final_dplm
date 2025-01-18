import styles from "./PageProducts.module.css";
import { isDataArray } from "../../utils/utils";
import { useState } from "react";
// import { selectProductOrder } from "../../selectors/select-product-order";
import { useDispatch, useSelector } from "react-redux";
import { selectModal } from "../../selectors/select-modal";
import { openModal } from "../../actions/open-modal";
import { ModalOrder } from "../../components/Layout/Modal/ModalOrder";
import { useEffect } from "react";

function PageProducts() {
    
    const [currentOpenModalWindow, setCurrentOpenModalWindow] = useState(null)
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3002/products')
        .then((response) => response.json())
        .then((data) => {
            setProducts(data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });
    }, [])

    const isModalOpen = useSelector(selectModal);

    const orderProduct = (id) => {
        dispatch(openModal());
        setCurrentOpenModalWindow(id)
    };
    return (
        <>
            {isModalOpen.isOpen ? <ModalOrder currentOpenModalWindow={currentOpenModalWindow} /> : null}
            <div className="indent container">
                <h2 id="product" className={`${styles.products_title}`}>
                    Products
                </h2>
                <div className="row">
                    {isDataArray(products) ? (
                        products.map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    className={"col-4 " + styles.product_item}
                                >
                                    <img src={product.src} alt="" />
                                    <div className={styles.product_wrapper}>
                                        <div
                                            className={styles.product_card_top}
                                        >
                                            <h3 className={styles.product_name}>
                                                {product.name}
                                            </h3>
                                            <p
                                                className={
                                                    styles.product_description
                                                }
                                            >
                                                {product.description}
                                            </p>
                                        </div>
                                        <div
                                            className={styles.product_bottom}
                                            data-id={product.id}
                                        >
                                            <p className={styles.product_price}>
                                                {product.price} ₽
                                            </p>
                                            <a
                                                onClick={() => orderProduct(product.id)}
                                                className={
                                                    styles.product_button
                                                }
                                            >
                                                <i
                                                    className="fa fa-cart-arrow-down"
                                                    aria-hidden="true"
                                                ></i>
                                                <span
                                                    className={
                                                        styles.product_order
                                                    }
                                                >
                                                    Order
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Товары не найдены</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default PageProducts;

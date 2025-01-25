import React, { useEffect } from "react";
import styles from "./PageProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productsActions";
import { selectProductsLoading, selectProductsError } from "../../selectors/productsSelectors";
import { isDataArray } from "../../utils/utils";
import { selectModal } from "../../selectors/select-modal";
import { openModal } from "../../actions/open-modal";
import { ModalOrder } from "../../components/Layout/Modal/ModalOrder";
import { Find } from "../../components/Layout/Find/Find";
import { Sort } from "../../components/Layout/Sort/Sort"; 

function PageProducts() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filteredProducts); 
    const loading = useSelector(selectProductsLoading);
    const error = useSelector(selectProductsError);
    const isModalOpen = useSelector(selectModal);

    const [currentOpenModalWindow, setCurrentOpenModalWindow] = React.useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const orderProduct = (id) => {
        dispatch(openModal());
        setCurrentOpenModalWindow(id);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {isModalOpen.isOpen ? (
                <ModalOrder currentOpenModalWindow={currentOpenModalWindow} />
            ) : null}
            <div className="indent container">
                <h2 id="product" className={`${styles.products_title}`}>
                    Products
                </h2>
                <Find />
                <Sort /> 
                <div className="row">
                    {isDataArray(products) && products.length > 0 ? (
                        products.map((product) => {
                            return (
                                <div
                                    key={product._id}
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
                                            data-id={product._id}
                                        >
                                            <p className={styles.product_price}>
                                                {product.price} ₽
                                            </p>
                                            <a
                                                onClick={() =>
                                                    orderProduct(product._id)
                                                }
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
                        <p className={styles.no_products_message}>
                            No products found.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default PageProducts;

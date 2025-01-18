import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../selectors/select-current-user";
import { selectProductOrder } from "../../../selectors/select-product-order";
import { logout } from "../../../actions/logout";

function Header() {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser);
    const orderAmount = useSelector(selectProductOrder);

    const logOut = () => {
        dispatch(logout())
    }
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={`${styles.header} row`}>
                    <div className={`${styles.logo} col-3`}>
                        <img
                            src="/images/logoPizza.avif"
                            alt="Logo"
                            className={`${styles.logo_img}`}
                        />
                    </div>
                    <nav className={`${styles.menu} col-3`}>
                        <ul className={`${styles.menu_items} `}>
                            <li className={`${styles.menu_item}`}>
                                <Link to="/">
                                    <div
                                        className={`${styles.menu_item_link} ${styles.underline_effect}`}
                                    >
                                        Home
                                    </div>
                                </Link>
                            </li>
                            <li className={`${styles.menu_item}`}>
                                <a
                                    href="#product"
                                    className={`${styles.menu_item_link} ${styles.underline_effect}`}
                                >
                                    Catalog
                                </a>
                            </li>
                            <li className={`${styles.menu_item}`}>
                                <a
                                    href="#reviews"
                                    className={`${styles.menu_item_link} ${styles.underline_effect}`}
                                >
                                    Reviews
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className={`${styles.header_options} col-3`}>
                        <div className={`${styles.cart}`}>
                            <Link to="/cart">
                                <i
                                    className="fa fa-cart-arrow-down"
                                    aria-hidden="true"
                                ></i>
                            </Link>
                            {orderAmount.length ? (
                                <div className={styles.cart_banner}>
                                    {orderAmount.length}
                                </div>
                            ) : null}
                        </div>
                        <div className={`${styles.account}`}>
                            <Link to="/authorization">
                                <i
                                    className="fa fa-user-o"
                                    aria-hidden="true"
                                ></i>
                            </Link>
                        </div>
                        <div className={`${styles.account}`}>
                            {currentUser.login ? (
                                <i
                                    className="fa fa-sign-out"
                                    aria-hidden="true"
                                    onClick={logOut}
                                ></i>
                            ) : null}
                        </div>
                        <p>{currentUser.login ? currentUser.login : "Guest"}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={`${styles.footer}`}>
            <div className="indent container">
                <div className={`${styles.footer_row} row`}>
                    <div className={`${styles.footer_about} col-4`}>
                        <h3 className="footer_heading">About us</h3>
                        <div className="footer_description">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Iusto quisquam quam ipsa quas vero illo,
                            repreheplaceat laborum voluptatum.
                        </div>
                    </div>
                    <div className="col-1">
                        <h3 className="footer_heading">Links</h3>
                        <ul className={styles.footer_items}>
                            <li className={styles.footer_item}>
                                <a href="" className="footer_item_link">
                                    <span>Home</span>
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="" className="footer_item_link">
                                    <span>Products</span>
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="" className="footer_item_link">
                                    <span>Reviews</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <h3 className="footer_heading">Social</h3>
                        <ul className={styles.footer_items}>
                            <li className="footer_item">
                                <a href="" className="footer_item_link">
                                    {/* <i className="ti ti-brand-facebook"></i> */}
                                    <span>Facebook</span>
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="" className="footer_item_link">
                                    {/* <i className="ti ti-brand-instagram"></i> */}
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li className="footer_item">
                                <a href="" className="footer_item_link">
                                    {/* <i className="ti ti-brand-whatsapp"></i> */}
                                    <span>WhatsApp</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <h3 className="footer_heading">Contacts us</h3>
                        <ul className={styles.footer_items}>
                            <li className="footer_item">
                                <a
                                    href="tel:+7-(987)-65-43-21"
                                    className="footer_item_link"
                                >
                                    {/* <i className="ti ti-phone-call"></i> */}
                                    <span>+7-(987)-65-43-21</span>
                                </a>
                            </li>
                            <li className="footer_item">
                                <a
                                    href="#ссылка_на_карту"
                                    className="footer_item_link"
                                >
                                    {/* <i className="ti ti-map-pin"></i> */}
                                    <span>Moscow, Lenina st. 1</span>
                                </a>
                            </li>
                            <li className="footer_item">
                                <a
                                    href="mailto:info@pizza.ru"
                                    className="footer_item_link"
                                >
                                    {/* <i className="ti ti-mail-opened"></i> */}
                                    <span>info@pizza.ru</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

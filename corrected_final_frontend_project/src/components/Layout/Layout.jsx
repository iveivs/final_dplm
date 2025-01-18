import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./Layout.module.css"

function Layout() {
    return (
        <div className={styles.layout_wrapper}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;

// import styles from "./PageHome.module.css";
import Banner from "./components/banner/Banner";
import PageProducts from "../PageProducts";
import { Reviews } from "../../components/Layout/Reviews/Reviews";

function PageHome() {
    return (
        <>
            <Banner />
            <PageProducts />
            <Reviews  />

        </>
    );
}

export default PageHome;

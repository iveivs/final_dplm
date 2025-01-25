import Banner from "./components/banner/Banner";
import PageProducts from "../PageProducts";
import { Reviews } from "../../components/Layout/Reviews/Reviews";
import MapSection from "../../components/Layout/MapSection/MapSection";

function PageHome() {
    return (
        <>
            <Banner />
            <PageProducts />
            <Reviews  />
            <MapSection  />
        </>
    );
}

export default PageHome;

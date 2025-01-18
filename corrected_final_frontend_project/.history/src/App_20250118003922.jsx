import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./pages/PageHome";
import PageProducts from "./pages/PageProducts";
import SingleProduct from "./pages/SingleProduct";
import Layout from "./components/Layout/Layout";
import { Authorization } from "./pages/Authorization/Authorization";
import { Registration } from "./pages/Registration/Registration";
import { store } from "./store";
import "./App.css";
import { Cart } from "./pages/Cart/Cart";
import { AuthInitializer } from "./utils/authInitializer";


function App() {
    return (
        <Provider store={store}>
            <AuthInitializer /> 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<PageHome />} />
                        <Route path="/products" element={<PageProducts />} />
                        <Route path="/products/:id" element={<SingleProduct />} />
                        <Route path="/authorization" element={<Authorization />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/cart" element={<Cart />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

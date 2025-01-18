
import { Provider } from 'react-redux';
// npm run json-server

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageHome from './pages/PageHome'
import PageProducts from './pages/PageProducts'
import SingleProduct from './pages/SingleProduct'
import Layout from './components/Layout/Layout'
// import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin'
import { Authorization } from './pages/Authorization/Authorization'
import { Registration } from './pages/Registration/Registration'
import { store } from './store'
import './App.css'
import { Cart } from './pages/Cart/Cart';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
        fetch("http://localhost:3000/auth/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to authenticate token");
                }
                return response.json();
            })
            .then((data) => {
                // Сохраняем пользователя в Redux
                dispatch(addUser(data.username, "", data.email, false));
            })
            .catch((error) => {
                console.error("Error restoring user session:", error);
                localStorage.removeItem("authToken");
            });
    }
}, [dispatch]);
  return (
    <Provider store ={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route path="/" element={ <PageHome /> } />
          <Route path="/products" element={ <PageProducts /> } />
          <Route path="/products/:id" element={ <SingleProduct /> } />
          <Route path="/authorization" element={ <Authorization /> } />
          <Route path="/registration" element={ <Registration /> } />
          <Route path="/cart" element={ <Cart /> } />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App

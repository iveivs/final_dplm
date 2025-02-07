import { cleanCart } from "./clean-cart";
import { API_HOST } from "../config";

export const handleBuy = (currentUser, currentOrder, totalPrice, setModalMessage, setModalVisible) => {
    return async (dispatch) => {
        if (!currentUser.login) {
            setModalMessage("Пожалуйста, авторизуйтесь или зарегистрируйтесь для оформления заказа.");
            setModalVisible(true);
            return;
        }

        try {
            const orderDetails = {
                user: {
                    username: currentUser.login,
                    email: currentUser.email,
                },
                order: currentOrder,
                totalPrice,
            };

            const response = await fetch(`${API_HOST}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                throw new Error("Ошибка оформления заказа.");
            }

            setModalMessage("Заказ принят в обработку. Вам выслано письмо с подтверждением заказа.");
            dispatch(cleanCart());
        } catch (error) {
            console.error("Ошибка обработки заказа:", error);
            setModalMessage("Не удалось оформить заказ. Попробуйте позже.");
        } finally {
            setModalVisible(true);
        }
    };
};

    import Order from "../models/Order.js";

    export const createOrder = async (req, res) => {
        try {
            const { user, order, totalPrice } = req.body;

            // Создаем новый заказ
            const newOrder = new Order({
                user,
                orderItems: order,
                totalPrice,
            });

            // Сохраняем заказ в базе данных
            await newOrder.save();

            res.status(201).json({ message: "Order received successfully" });
        } catch (error) {
            console.error("Error processing order:", error);
            res.status(500).json({ error: "Failed to process order" });
        }
    };

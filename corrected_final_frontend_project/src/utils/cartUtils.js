export const updateOrderQuantity = (order, id, amountChange) => {
    return order.map((item) =>
        item.id === id
            ? { ...item, amount: item.amount + amountChange }
            : item
    );
};

export const processOrder = async (orderDetails, apiHost) => {
    const response = await fetch(`${apiHost}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
        throw new Error("Failed to process order.");
    }

    return response.json();
};
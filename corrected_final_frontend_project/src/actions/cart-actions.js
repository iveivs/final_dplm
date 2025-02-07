export const INCREASE_PRODUCT_AMOUNT = "INCREASE_PRODUCT_AMOUNT";
export const DECREASE_PRODUCT_AMOUNT = "DECREASE_PRODUCT_AMOUNT";

export const increaceProductAmount = (id) => (dispatch, getState) => {
    const { orderReducer } = getState();
    const updatedOrder = orderReducer.productOrder.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
    );

    dispatch({
        type: INCREASE_PRODUCT_AMOUNT,
        payload: updatedOrder,
    });
};

export const decreaceProductAmount = (id) => (dispatch, getState) => {
    const { orderReducer } = getState();
    const updatedOrder = orderReducer.productOrder
        .map((item) =>
            item.id === id ? { ...item, amount: Math.max(item.amount - 1, 0) } : item
        )
        .filter((item) => item.amount > 0);

    dispatch({
        type: DECREASE_PRODUCT_AMOUNT,
        payload: updatedOrder,
    });
};

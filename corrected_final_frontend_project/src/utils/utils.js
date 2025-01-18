export function isDataArray(data) {
    return Array.isArray(data) && data.length
}

export function getTotalPrice(array) {
    let summ = 0;
    array.map(elem => summ += elem.price * elem.amount)
    return summ
}

export const increaceProductAmount = (setAmount) => {
    setAmount((prevAmount) => prevAmount + 1);
};

export const decreaceProductAmount = (setAmount) => {
    setAmount((prevAmount) => (prevAmount > 0 ? prevAmount - 1 : 0));
};

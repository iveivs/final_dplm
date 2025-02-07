import styles from './AmountCounter.module.css';

// eslint-disable-next-line react/prop-types
export const AmountCounter = ({ decreaceProductAmount, increaceProductAmount, amount }) => {
    return (
        <>
            <div className={styles.amount}>
                <p
                    className={styles.decreace}
                    onClick={decreaceProductAmount} 
                >
                    –
                </p>
                <p>{amount}</p>
                <p
                    className={styles.increace}
                    onClick={increaceProductAmount}
                >
                    +
                </p>
            </div>
        </>
    );
};

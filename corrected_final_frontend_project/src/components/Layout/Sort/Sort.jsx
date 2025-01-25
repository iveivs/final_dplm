import { useDispatch } from "react-redux";
import { sortProductsByPrice } from "../../../actions/sort-products-actions";
import styles from "./Sort.module.css";

export const Sort = () => {
    const dispatch = useDispatch();

    const handleSortChange = (event) => {
        const sortOrder = event.target.value;
        dispatch(sortProductsByPrice(sortOrder));
    };

    return (
        <div className={styles.sortWrapper}>
            <label htmlFor="sort" className={styles.sortLabel}>
                Sort:
            </label>
            <select
                id="sort"
                onChange={handleSortChange}
                className={styles.sortSelect}
            >
                <option value="none">None</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    );
};

// import { useDispatch } from "react-redux";
// import { filterProductsByName } from "../../../actions/filter-products-actions";
// import styles from "./Find.module.css";
// import { Input } from "../UI/Input/Input";

// export const Find = () => {
//     const dispatch = useDispatch();

//     const handleInputChange = (event) => {
//         const searchValue = event.target.value;
//         dispatch(filterProductsByName(searchValue));
//     };

//     return (
//         <div className={styles.findWrapper}>
//             <Input
//                 type="text"
//                 placeholder="Search products..."
//                 onChange={handleInputChange}
//                 className={styles.findInput}
//             />
//         </div>
//     );
// };

import { useDispatch } from "react-redux";
import { filterProductsByName } from "../../../actions/filter-products-actions";
import styles from "./Find.module.css";
import { Input } from "../UI/Input/Input";
import { useState } from "react";

export const Find = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value); 
        dispatch(filterProductsByName(value));
    };

    return (
        <div className={styles.findWrapper}>
            <Input
                type="text"
                placeholder="Search products..."
                value={searchValue} 
                onChange={handleInputChange}
                className={styles.findInput}
            />
        </div>
    );
};


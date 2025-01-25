import PropTypes from "prop-types";
import styles from "./Input.module.css";

export const Input = ({ type = "text", value, onChange, placeholder = "", className = "" }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
        />
    );
};

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

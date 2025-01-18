import styles from "./Registration.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../actions/add-user";

export const Registration = () => {
    const [userLogin, setUserLogin] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmUserPassword, setConfirmUserPassword] = useState("");
    const [error, setError] = useState("");
    const [isUserCreated, setIsUserCreated] = useState(false);

    const dispatch = useDispatch();

    const validatePassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9]{4,20}$/;
        return passwordRegex.test(password);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return emailRegex.test(email)
    }

    // const addNewUserToServer = (newUser) => {
    //     fetch('http://localhost:3000/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newUser)
    //     })
    //     .then((response) => response.json() )
    //     .then((data) => {
    //         console.log("Product added successfully:", data)
    //     })
    //     .catch((error) => {
    //         console.error("Error adding product:", error);
    //     });
    // }
    const addNewUserToServer = (newUser) => {
        fetch('http://localhost:3000/auth/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then((data) => {
            console.log("User registered successfully:", data);
        })
        .catch((error) => {
            console.error("Error registering user:", error);
        });
    };

    const onSubmit = () => {
        if (!validatePassword(userPassword)) {
            setError(
                "Пароль должен содержать только буквы и цифры, длиной от 4 до 20 символов."
            );
            return;
        }
        if (userPassword !== confirmUserPassword) {
            setError("Пароли не совпадают.");
            return;
        }
        if(!validateEmail(userEmail)) {
            setError("Введите корректный e-mail.")
            return
        }

        const userData = {
            login: userLogin,
            password: userPassword,
            email: userEmail,
        };

        setIsUserCreated(true);
        dispatch(addUser(userData.login, userData.password, userData.email));
        addNewUserToServer(userData)
        setError("");
    };
    return (
        <div className="container indent">
            {isUserCreated ? (
                <div className={styles.success_registration}>
                    Вы успешно зарегестрировались
                </div>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2 className={styles.title_registration}>Registration</h2>
                    <input
                        className={styles.input_item}
                        placeholder="Your e-mail..."
                        type="text"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <input
                        className={styles.input_item}
                        type="text"
                        placeholder="Your login..."
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                    />
                    <input
                        className={styles.input_item}
                        type="password"
                        placeholder="Your password..."
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <input
                        className={styles.input_item}
                        type="password"
                        placeholder="Confirm password..."
                        value={confirmUserPassword}
                        onChange={(e) => setConfirmUserPassword(e.target.value)}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button
                        type="button"
                        className={`button ${styles.btn_modificated}`}
                        onClick={onSubmit}
                    >
                        Registration
                    </button>
                </form>
            )}
            <div className={styles.registration_link}>
                <Link className={styles.registration_link_text} to="/">
                    На главную
                </Link>
            </div>
        </div>
    );
};



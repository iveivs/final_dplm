import styles from "./Registration.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSuccess } from "../../actions/authThunks"; // Заменили addUser на authSuccess
import { API_HOST } from "../../config";
import { Input } from "../../components/Layout/UI/Input/Input";
import { Button } from "../../components/Layout/UI/Button/Button";

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
        return emailRegex.test(email);
    };

    const addNewUserToServer = (newUser) => {
        fetch(`${API_HOST}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Registration failed");
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("authToken", data.token);
                setIsUserCreated(true);

                dispatch(authSuccess({ // Заменили addUser на authSuccess
                    username: newUser.username,
                    email: newUser.email,
                    phone: null
                }));
            })
            .catch((error) => {
                console.error("Error registering user:", error);
                setError("Registration failed. Please try again.");
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
        if (!validateEmail(userEmail)) {
            setError("Введите корректный e-mail.");
            return;
        }

        const userData = {
            username: userLogin,
            password: userPassword,
            email: userEmail,
        };

        setIsUserCreated(true);
        addNewUserToServer(userData);
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
                    <Input
                        placeholder="Your e-mail..."
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={styles.input_item}
                    />
                    <Input
                        placeholder="Your login..."
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        className={styles.input_item}
                    />
                    <Input
                        type="password"
                        placeholder="Your password..."
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className={styles.input_item}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm password..."
                        value={confirmUserPassword}
                        onChange={(e) => setConfirmUserPassword(e.target.value)}
                        className={styles.input_item}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <Button
                        onClick={onSubmit}
                        className={styles.btn_modificated}
                    >
                        Registration
                    </Button>
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

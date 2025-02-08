import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Authorization.module.css";
import { addPhone, deletePhone } from "../../actions/userPhoneActions";
import { selectCurrentUser } from "../../selectors/select-current-user";
import { API_HOST } from "../../config";
import { authSuccess } from "../../actions/authThunks"; // Заменили addUser на authSuccess
import { Input } from "../../components/Layout/UI/Input/Input";
import { Button } from "../../components/Layout/UI/Button/Button";

export const Authorization = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const isUserLoggedIn = currentUser && currentUser.login;

    const confirmAuthorization = async () => {
        if (!userLogin || !userPassword) {
            setError("Please enter both login and password.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_HOST}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userLogin,
                    password: userPassword,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Invalid credentials");
            }
            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            dispatch(authSuccess({
                username: data.username,
                email: data.email,
                phone: data.phone || null
            }));
            setError("");
            navigate("/");
        } catch (error) {
            setError(error.message || "Invalid login or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        dispatch(authSuccess({ username: null, email: null, phone: null })); 
        navigate("/");
    };

    const handleAddPhone = () => {
        let phonNumberString = new String(phone).trim();
        if (phonNumberString.length > 11) {
            setError("Your phone number is too long.");
            return;
        }
        if (!phone) {
            setError("Please enter a phone number.");
            return;
        }

        setError("");
        setLoading(true);
        dispatch(addPhone(phone))
            .then(() => {
                setPhone("");
            })
            .catch((error) => {
                console.error("Error adding phone:", error);
                setError("Failed to add phone.");
            })
            .finally(() => setLoading(false));
    };

    const handleDeletePhone = () => {
        setLoading(true);
        dispatch(deletePhone())
            .then(() => {
                console.log("Phone deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting phone:", error);
                setError("Failed to delete phone.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container indent">
            {isUserLoggedIn ? (
                <div className={styles.user_info}>
                    <h2>Your login: {currentUser.login}</h2>
                    <h2>Your email: {currentUser.email}</h2>
                    <h2>
                        Your phone:{" "}
                        {currentUser.phone || "No phone number added"}
                    </h2>
                    <Input
                        type="number"
                        placeholder="Add phone number..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input_phone"
                    />
                    <Button
                        onClick={handleAddPhone}
                        disabled={loading}
                        className="button_authorized"
                    >
                        {loading ? "Adding..." : "Add Phone"}
                    </Button>
                    {currentUser.phone && (
                        <Button
                            onClick={handleDeletePhone}
                            disabled={loading}
                            className="button_authorized"
                        >
                            {loading ? "Deleting..." : "Delete Phone"}
                        </Button>
                    )}

                    <Button
                        onClick={handleLogout}
                        disabled={loading}
                        className="button_authorized"
                    >
                        Logout
                    </Button>

                    {error && <p className="error_message">{error}</p>}
                </div>
            ) : (
                <>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2 className={styles.title_authorization}>
                            Authorization
                        </h2>
                        <Input
                            type="text"
                            placeholder="Your login..."
                            value={userLogin}
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Your password..."
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <Link
                            className={styles.registration_link}
                            to="/registration"
                        >
                            Registration
                        </Link>
                    </form>

                    <div className={styles.button_authorization}>
                        <Button
                            onClick={confirmAuthorization}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Enter"}
                        </Button>
                    </div>

                    {error && <p className={styles.error_message}>{error}</p>}
                </>
            )}
        </div>
    );
};

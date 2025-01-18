import { useSelector, useDispatch } from "react-redux";
import styles from "./Authorization.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addUser } from "../../actions/add-user";
import { selectCurrentUser } from "../../selectors/select-current-user";

export const Authorization = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isUserLogin = currentUser?.wasLogout;

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const wasLogout = true;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3002/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Users not found");
            });
    }, []);

    const confirmAuthorization = () => {
        console.log('I was clicked');
        if (userLogin && userPassword) {
            users.map((user) => {
                if (
                    user.login === userLogin &&
                    user.password === userPassword
                ) {
                    dispatch(
                        addUser(userLogin, userPassword, user.email, wasLogout)
                    );
                    navigate("/");
                }  else {
                    console.log('I was not finded');
                    setUserPassword('')
                    setUserLogin('')
                    setError("The entered data is incorrect")
                }
            });
        }
    };

    return (
        <div className="container indent">
            {isUserLogin ? (
                <>
                    <h2>Your login: {currentUser.login}</h2>
                    <h2>Your email: {currentUser.email}</h2>
                </>
            ) : (
                <>
                    <form action="">
                        <h2 className={styles.title_authorization}>
                            Authorization
                        </h2>
                        <input
                            className={styles.input_login}
                            type="text"
                            placeholder="Your login..."
                            value={userLogin}
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                        <input
                            className={styles.input_password}
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
                        <div
                            className={`button ${styles.btn_modificated}`}
                            onClick={confirmAuthorization}
                        >
                            Enter
                        </div>
                    </div>

                    {error && <p className={styles.error_message}>{error}</p>}
                </>
            )}
        </div>
    );
};

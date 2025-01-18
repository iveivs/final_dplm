// import { useSelector, useDispatch } from "react-redux";
// import styles from "./Authorization.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { addUser } from "../../actions/add-user";
// import { selectCurrentUser } from "../../selectors/select-current-user";

// export const Authorization = () => {
//     const currentUser = useSelector(selectCurrentUser);
//     const isUserLogin = currentUser?.wasLogout;

//     const [userLogin, setUserLogin] = useState("");
//     const [userPassword, setUserPassword] = useState("");
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState("");
//     const wasLogout = true;

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch("http://localhost:3000/auth/users")
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log('DATA', data);
//                 setUsers(data)
//             })
//             .catch((error) => {
//                 console.error("Error fetching users:", error);
//                 setError("Something went wrong. Please try again later");
//             });
//     }, []);

//     const confirmAuthorization = () => {
//         console.log('I was clicked');
//         if (userLogin && userPassword) {
//             users.map((user) => {
//                 if (
//                     user.username === userLogin &&
//                     user.password === userPassword
//                 ) {
//                     dispatch(
//                         addUser(userLogin, userPassword, user.email, wasLogout)
//                     );
//                     navigate("/");
//                 }  else {
//                     console.log('I was not finded');
//                     setUserPassword('')
//                     setUserLogin('')
//                     setError("The entered data is incorrect")
//                 }
//             });
//         }
//     };

//     return (
//         <div className="container indent">
//             {isUserLogin ? (
//                 <>
//                     <h2>Your login: {currentUser.login}</h2>
//                     <h2>Your email: {currentUser.email}</h2>
//                 </>
//             ) : (
//                 <>
//                     <form action="">
//                         <h2 className={styles.title_authorization}>
//                             Authorization
//                         </h2>
//                         <input
//                             className={styles.input_login}
//                             type="text"
//                             placeholder="Your login..."
//                             value={userLogin}
//                             onChange={(e) => setUserLogin(e.target.value)}
//                         />
//                         <input
//                             className={styles.input_password}
//                             type="password"
//                             placeholder="Your password..."
//                             value={userPassword}
//                             onChange={(e) => setUserPassword(e.target.value)}
//                         />
//                         <Link
//                             className={styles.registration_link}
//                             to="/registration"
//                         >
//                             Registration
//                         </Link>
//                     </form>

//                     <div className={styles.button_authorization}>
//                         <div
//                             className={`button ${styles.btn_modificated}`}
//                             onClick={confirmAuthorization}
//                         >
//                             Enter
//                         </div>
//                     </div>

//                     {error && <p className={styles.error_message}>{error}</p>}
//                 </>
//             )}
//         </div>
//     );
// };
import { useSelector, useDispatch } from "react-redux";
import styles from "./Authorization.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addUser } from "../../actions/add-user";
import { selectCurrentUser } from "../../selectors/select-current-user";

export const Authorization = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isUserLogin = currentUser?.wasLogout;

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const confirmAuthorization = async () => {
        if (!userLogin || !userPassword) {
            setError("Please enter both login and password.");
            return;
        }
        clg
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: userLogin, password: userPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Invalid credentials");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Сохраняем пользователя в Redux
            dispatch(addUser(data.username, "", data.email, false));

            // Перенаправляем на главную страницу
            navigate("/");
        } catch (error) {
            console.error("Error logging in:", error.message);
            setError(error.message || "Invalid login or password.");
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
                    <form onSubmit={(e) => e.preventDefault()}>
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

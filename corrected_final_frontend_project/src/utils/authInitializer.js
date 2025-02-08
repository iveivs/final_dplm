import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../actions/authThunks";

export function AuthInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authenticateUser());
    }, [dispatch]);

    // Компонент не отображает интерфейс, только выполняет логику аутентификации поэтому решил строчку ниже не убирать
    return null;
}


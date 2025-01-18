import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import styles from "./LayoutAdmin.module.css"

function LayoutAdmin() {
    return(
        <div className={styles.wrap}>

            <Sidebar />

            <Outlet />

        </div>
    )
}

export default LayoutAdmin
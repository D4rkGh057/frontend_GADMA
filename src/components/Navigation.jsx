import { Outlet } from "react-router-dom";
import Navbar from "../layouts/navbar";

export const Navigation = () => {
    return(
        <>
        <header>
            <Navbar />
        </header>
        <Outlet />
        </>
    )
}
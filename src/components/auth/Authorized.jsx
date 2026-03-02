import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    let location = useLocation()

    if (localStorage.getItem("artist")) {
        return children
    } else if (localStorage.getItem("bandmember")) {
        return children
    } else {
        <Navigate to={"/login"} state={{ from: location }} replace />
    }
}
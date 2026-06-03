import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    let location = useLocation()

    if (sessionStorage.getItem("auth_token")) {
        return children
    } else {
        return <Navigate to={"/login"} state={{ from: location }} replace />
    }
}

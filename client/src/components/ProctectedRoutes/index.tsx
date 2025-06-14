import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";


const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const isLoggin = useSelector((state: RootState) => state.authLogin.isLoggin)
    console.log("login",isLoggin)
    return isLoggin ? children : <Navigate to="/" replace />;
};

export default ProtectedRoutes;

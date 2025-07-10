import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const token = localStorage.getItem("access");

    // Si no hay token, redirige al login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si hay token, muestra el contenido (children)
    return children;
}
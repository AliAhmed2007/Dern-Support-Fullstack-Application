import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("The useAuth must be wrapped by AuthProvider to access its context");
    }
    return context
}
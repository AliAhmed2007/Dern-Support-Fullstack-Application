import { useContext } from "react";
import { UserProfileContext } from "../context/UserProfileContext";

export default function useUserProfile() {
    const context = useContext(UserProfileContext)

    if (!context) {
        throw new Error("The useUserProfile must be wrapped by UserProfileProvider to access its context");
    }
    return context
}
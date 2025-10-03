import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("The useTheme must be wrapped by ThemeProvider context");
    }
    return context
}
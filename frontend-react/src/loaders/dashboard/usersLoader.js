import { defer } from "react-router-dom";
import fetchUsers from "../../api/userAccounts/fetchUsers";

export async function loader() {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    
    return defer({
        users: fetchUsers(bearerToken)
    });
}

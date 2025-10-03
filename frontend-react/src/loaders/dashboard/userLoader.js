import { defer } from "react-router-dom";
import fetchUser from "../../api/userAccounts/fetchUser";

export async function loader({params}) {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    const userId = params.id;

    return defer({
        user: fetchUser(userId, bearerToken)
    });
}

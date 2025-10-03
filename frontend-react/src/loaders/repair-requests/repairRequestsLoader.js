import { defer } from "react-router-dom";
import fetchAllRepairRequests from "../../api/repairRequests/fetchAllRepairRequests";

export async function loader() {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token
    return defer({repairRequests: fetchAllRepairRequests(bearerToken)})
}
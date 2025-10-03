import { defer } from "react-router-dom";
import fetchDevices from "../../api/repairRequests/fetchDevices";

export async function loader() {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token
    return defer({devices: fetchDevices(bearerToken)})
}
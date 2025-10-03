import { defer } from "react-router-dom";
import fetchDeviceById from "../../api/repairRequests/fetchDeviceById";
import fetchGeneralProblemById from "../../api/repairRequests/fetchGeneralProblemById";
import fetchUsers from "../../api/userAccounts/fetchUsers";

export function loader() {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token
    const isAdmin = localStorage.getItem('userType') === 'admin'
    const deviceId = Number(localStorage.getItem('deviceId'))
    const generalProblemId = Number(localStorage.getItem('generalProblemId'))
    return defer({
        device: fetchDeviceById(deviceId, bearerToken),
        generalProblem: fetchGeneralProblemById(generalProblemId, bearerToken),
        users: isAdmin ? fetchUsers(bearerToken) : null 
    })
}
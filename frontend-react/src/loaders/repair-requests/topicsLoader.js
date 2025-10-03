import { defer } from "react-router-dom";
import fetchTopics from "../../api/repairRequests/fetchTopics";
import fetchDeviceById from "../../api/repairRequests/fetchDeviceById";

export async function loader() {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token
    const deviceId = Number(localStorage.getItem('deviceId'))
    return defer({
        device: fetchDeviceById(deviceId, bearerToken),
        topics: fetchTopics(deviceId, bearerToken)
    })
}
import { defer } from "react-router-dom";
import fetchSingleRepairRequest from "../../api/repairRequests/fetchSingleRepairRequst";

export async function loader({ params }) {
    const repairRequestId = params.id;
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    
    return defer({
        repairRequest: fetchSingleRepairRequest(bearerToken, repairRequestId)
    });
}

import { defer } from "react-router-dom";
import fetchTechnician from "../../api/technicians/fetchTechnician";

export async function loader({params}) {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    const technicianIdId = params.id;

    return defer({
        user: fetchTechnician(bearerToken, technicianIdId)
    });
}

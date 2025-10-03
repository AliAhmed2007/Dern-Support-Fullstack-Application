import { defer } from "react-router-dom";
import fetchAllTechnicians from "../../api/technicians/fetchAllTechnicians";

export async function loader() {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    
    return defer({
        technicians: fetchAllTechnicians(bearerToken)
    });
}

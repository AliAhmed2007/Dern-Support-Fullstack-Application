import submitRepairRequest from "../../api/repairRequests/submitRepairRequest";

export async function action({ request }) {
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    const formData = await request.formData();
    return await submitRepairRequest(formData, bearerToken);
}
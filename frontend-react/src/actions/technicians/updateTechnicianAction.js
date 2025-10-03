import updateTechnician from "../../api/technicians/updateTechnician";

export async function action({ request, params }) {
    const technicianId = params.id
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    const formData = await request.formData();
    return await updateTechnician(bearerToken, formData, technicianId);
}
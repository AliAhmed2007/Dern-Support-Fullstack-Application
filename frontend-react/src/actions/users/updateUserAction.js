import updateUser from "../../api/userAccounts/updateUser";

export async function action({ request, params }) {
    const userId = params.id
    const bearerToken = JSON.parse(localStorage.getItem('auth'))?.token;
    const formData = await request.formData();
    return await updateUser(bearerToken, formData, userId);
}
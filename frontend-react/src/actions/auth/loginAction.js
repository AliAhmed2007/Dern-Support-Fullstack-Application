import loginEndpoint from "../../api/auth/loginEndPoint";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const userCredentials = await loginEndpoint(formData)
    return userCredentials
};
import registerEndpoint from "../../api/auth/registerEndpoint";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const userCredentials = await registerEndpoint(formData)
    return userCredentials
  };
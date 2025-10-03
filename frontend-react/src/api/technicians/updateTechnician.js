async function updateTechnician(bearerToken, formData, technicianIdId) {
    try {
        // Convert FormData to a plain object
        const formObj = Object.fromEntries(formData.entries());

        const baseUrl = 'http://localhost:8000/api/';
        const response = await fetch(`${baseUrl}technicians/${technicianIdId}`, {
            method: 'PUT',
            body: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                authorization: `Bearer ${bearerToken}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return { errors: data.errors };
        }

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            errors: {
                server: `Connection failed. Please try again later. ${error.message}`,
                errors: error.errors
            },
        };
    }
}

export default updateTechnician;

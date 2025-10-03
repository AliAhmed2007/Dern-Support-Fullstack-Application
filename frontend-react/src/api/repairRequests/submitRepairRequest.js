async function submitRepairRequest(formData, bearerToken) {
    try {
        const baseUrl = 'http://localhost:8000/api';
        const response = await fetch(`${baseUrl}/repair-requests`, {
            method: 'POST',
            body: formData,
            headers: {
                authorization: `Bearer ${bearerToken}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Submission failed:', errorData);
            return;
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Error submitting repair request:', error);
    }
}

export default submitRepairRequest
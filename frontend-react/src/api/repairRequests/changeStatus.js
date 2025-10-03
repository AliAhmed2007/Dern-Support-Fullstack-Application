async function changeStatus(bearerToken, repairRequestId, status) {
    try {
        const baseUrl = 'http://localhost:8000/api';
        const response = await fetch(`${baseUrl}/repair-requests/${repairRequestId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: status }), 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                authorization: `Bearer ${bearerToken}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Connection failed: ${error.message}`);
    }
}

export default changeStatus;
